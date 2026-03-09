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

    const project = await Project.create({
      title,
      description,
      category,
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
    const User = require('../models/User'); // Import User inside if needed or at top
    
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

    await client.save();
    await worker.save();

    project.status = 'completed';
    await project.save();

    res.json({ message: 'Project approved. Credits transferred.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error approving work.', error: error.message });
  }
};
