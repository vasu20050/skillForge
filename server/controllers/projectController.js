const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, category, rewardCredits } = req.body;

    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can post projects.' });
    }
    
    // Check if client has enough credits
    if (req.user.credits < rewardCredits) {
        return res.status(400).json({ message: 'Not enough credits to post this project.' });
    }

    const defaultDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    const project = await Project.create({
      title,
      description,
      category,
      deadline: req.body.deadline || defaultDeadline,
      rewardParams: { credits: rewardCredits },
      client: req.user._id,
      status: 'open'
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating project.', error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('client', 'name email').populate('worker', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching projects.', error: error.message });
  }
};

exports.assignProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user.role !== 'worker') {
        return res.status(403).json({ message: 'Only workers can accept projects.' });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    if (project.status !== 'open') {
      return res.status(400).json({ message: 'Project is no longer open.' });
    }

    project.worker = req.user._id;
    project.status = 'assigned';
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error assigning project.', error: error.message });
  }
};

exports.submitWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileUrl, description } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    if (!project.worker || project.worker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the assigned worker can submit deliverables.' });
    }

    project.status = 'submitted';
    project.deliverables.push({ fileUrl, description, submittedAt: new Date() });
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error submitting work.', error: error.message });
  }
};

exports.approveWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body; 
    const User = require('../models/User'); 
    
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    if (project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the client who posted the project can approve it.' });
    }

    if (project.status !== 'submitted') {
      return res.status(400).json({ message: 'Project must be in submitted status to be approved.' });
    }

    // Transfer Credits Logic
    const reward = project.rewardParams.credits;
    const worker = await User.findById(project.worker);
    const client = await User.findById(project.client);

    if (client.credits < reward) {
      return res.status(400).json({ message: 'Client has insufficient credits to complete transfer.' });
    }

    client.credits -= reward;
    worker.credits += reward;

    // Reputation System Update (PRD Logic)
    worker.projectsCompleted = (worker.projectsCompleted || 0) + 1;
    worker.totalProjectsValue = (worker.totalProjectsValue || 0) + reward;

    if (rating !== undefined) {
      const currentAvg = worker.avgRating || 5;
      const totalCompleted = worker.projectsCompleted;
      worker.avgRating = ((currentAvg * (totalCompleted - 1)) + Number(rating)) / totalCompleted;
    }

    const latestDeliverable = project.deliverables[project.deliverables.length - 1];
    const isOnTime = latestDeliverable && latestDeliverable.submittedAt <= project.deadline;
    
    if (!isOnTime) {
      worker.onTimeDeliveryRate = Math.max(0, (worker.onTimeDeliveryRate || 100) - 5);
    }

    // Reputation Score = (Avg Rating × 0.5) + (Completion Rate × 0.3) + (On-Time Delivery × 0.1) + (Project Value × 0.1)
    const avgR = worker.avgRating || 5;
    const compR = worker.completionRate || 100;
    const onTimeR = worker.onTimeDeliveryRate || 100;
    const projV = worker.totalProjectsValue || 0;
    
    worker.reputationScore = (avgR * 0.5) + (compR * 0.3) + (onTimeR * 0.1) + (Math.min(projV, 100) * 0.1);

    // Verified Badge Criteria
    if ((rating === undefined || rating >= 4) && isOnTime && project.disputeStatus === 'none') {
      project.isVerifiedPortfolioEntry = true;
    }

    await client.save();
    await worker.save();

    project.status = 'completed';
    await project.save();

    res.json({ message: 'Project approved. Credits transferred.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error approving work.', error: error.message });
  }
};

exports.requestRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    if (project.client.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });

    project.status = 'revision';
    await project.save();
    res.json({ message: 'Revision requested.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.raiseDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const project = await Project.findById(id);
    
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    if (project.client.toString() !== req.user._id.toString() && (!project.worker || project.worker.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    project.status = 'disputed';
    project.disputeStatus = 'level1';
    project.disputeReason = reason || 'No reason provided';
    await project.save();

    res.json({ message: 'Dispute raised. Status escalated to Level 1.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

