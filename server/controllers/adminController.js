const User = require('../models/User');
const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// List Users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// List Projects
exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('client_id', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

// Seed Learn Projects
exports.seedLearnProjects = async (req, res) => {
  try {
    let admin = await User.findOne({ roles: 'admin' });
    if (!admin) {
      return res.status(400).json({ message: 'System Admin not found. Please create an admin user first.' });
    }

    const dummyProjects = [
      {
        type: 'learn_dummy',
        title: 'Basic Graphic Design: Campus Poster',
        description: 'Design a professional poster for the annual Tech Fest. Must include logo, event date, and QR code.',
        category: 'Graphic Design',
        client_id: admin._id,
        credits_total: 50,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'open',
        proof_requirements: ['file_submission']
      },
      {
        type: 'learn_dummy',
        title: 'Backend Challenge: Auth API',
        description: 'Implement a basic JWT authentication system using Express and MongoDB. Must include Login and Register endpoints.',
        category: 'Web Development',
        client_id: admin._id,
        credits_total: 100,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'open',
        proof_requirements: ['github_url']
      }
    ];

    const count = await Project.countDocuments({ type: 'learn_dummy' });
    if (count > 0) return res.status(400).json({ message: 'Learn projects already seeded.' });

    const createdProjects = await Project.insertMany(dummyProjects);

    for (const project of createdProjects) {
        await Milestone.create({
            project_id: project._id,
            title: 'Final Submission',
            description: 'Submit the final work artifact as per requirements.',
            amount_credits: project.credits_total,
            percentage_split: 100,
            due_date: project.deadline,
            status: 'pending'
        });
    }

    res.json({ message: 'Seeded learn projects successfully.', projects: createdProjects });
  } catch (err) {
    res.status(500).json({ message: 'Server error during seeding' });
  }
};

// Evaluate Learn Submission
exports.evaluateLearnSubmission = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { milestoneId, score, feedback } = req.body;
      const milestone = await Milestone.findById(milestoneId).session(session);
      if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
  
      const project = await Project.findById(milestone.project_id).session(session);
      if (project.type !== 'learn_dummy') {
          return res.status(400).json({ message: 'This route only evaluates learn submissions.' });
      }
  
      milestone.status = 'approved'; 
      await milestone.save({ session });
  
      const workerId = project.team.worker_ids[0];
      const worker = await User.findById(workerId).session(session);
      
      const currentAvg = worker.verification.average_learn_rating;
      const totalComp = worker.verification.completed_learn_projects;
      worker.verification.completed_learn_projects += 1;
      worker.verification.average_learn_rating = ((currentAvg * totalComp) + score) / (totalComp + 1);
  
      if (worker.verification.completed_learn_projects >= 3 && worker.verification.average_learn_rating >= 3.8) {
          worker.mode_status = 'verified_earner';
          worker.verification.verified_at = new Date();
      }
  
      const reward = project.credits_total;
      worker.credits_wallet.available += reward;
      worker.credits_wallet.lifetime_earned += reward;
  
      await Transaction.create([{
          tx_type: 'bonus',
          to_user_id: worker._id,
          amount: reward,
          balance_snapshot: { before: worker.credits_wallet.available - reward, after: worker.credits_wallet.available },
          metadata: { reason: `Learn reward: ${project.title}` }
      }], { session });
  
      await worker.save({ session });
      await session.commitTransaction();
      res.json({ message: 'Evaluation completed', worker_status: worker.mode_status });
    } catch (err) {
      await session.abortTransaction();
      res.status(500).json({ message: 'Error evaluating' });
    } finally {
      session.endSession();
    }
  };

// Verify User Manually
exports.verifyUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.mode_status = status; 
    if (status === 'verified_earner' && !user.verification.verified_at) {
        user.verification.verified_at = new Date();
    }
    await user.save();
    res.json({ message: `User status updated to ${status}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
