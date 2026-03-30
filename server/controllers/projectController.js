const Project = require('../models/Project');
const User = require('../models/User');
const Milestone = require('../models/Milestone');
const Contract = require('../models/Contract');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Create a Project (Earn Real)
exports.createProject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { title, description, category, credits_total, deadline, milestones } = req.body;
    const client = await User.findById(req.user._id).session(session);

    if (!client.roles.includes('client')) {
      return res.status(403).json({ message: 'Only clients can post real projects.' });
    }

    if (client.credits_wallet.available < credits_total) {
      return res.status(400).json({ message: 'Insufficient credits to fund this project.' });
    }

    const project = await Project.create([{
      type: 'earn_real',
      title,
      description,
      category,
      client_id: client._id,
      credits_total,
      deadline,
      status: 'open',
      verification_required: true
    }], { session });

    // Fund the project (Escrow Lock)
    await Transaction.create([{
      tx_type: 'escrow_lock',
      from_user_id: client._id,
      project_id: project[0]._id,
      amount: credits_total,
      balance_snapshot: {
        before: client.credits_wallet.available,
        after: client.credits_wallet.available - credits_total
      },
      metadata: { reason: `Escrow locked for project: ${title}` }
    }], { session });

    client.credits_wallet.available -= credits_total;
    client.credits_wallet.escrow_locked += credits_total;
    await client.save({ session });

    // Create milestones
    for (const m of milestones) {
      await Milestone.create([{
        project_id: project[0]._id,
        ...m,
        status: 'pending'
      }], { session });
    }

    await session.commitTransaction();
    res.status(201).json(project[0]);
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: 'Error creating project and funding escrow.' });
  } finally {
    session.endSession();
  }
};

// Apply/Accept a Project
exports.applyForProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found.' });
    if (project.status !== 'open') return res.status(400).json({ message: 'Project is no longer open for applications.' });

    // Check verification status for Earn Real projects
    if (project.type === 'earn_real' && req.user.mode_status !== 'verified_earner') {
      return res.status(403).json({ 
          message: 'Verification Required: Complete Learn Mode to unlock Earn Mode projects.',
          code: 'LEARN_PIPELINE'
      });
    }

    // Assign worker (In MVP, first come first serve or simple assignment)
    project.team.worker_ids.push(req.user._id);
    project.status = 'pending_contract';
    await project.save();

    // Auto-generate Contract
    const milestones = await Milestone.find({ project_id: project._id });
    await Contract.create({
      project_id: project._id,
      client_id: project.client_id,
      worker_ids: [req.user._id],
      scope: { title: project.title, description: project.description },
      terms: { base_credits: project.credits_total, deadline: project.deadline },
      status: 'pending_acceptance',
      milestones_snapshot: milestones.map(m => ({
        milestone_id: m._id,
        title: m.title,
        credits: m.amount_credits,
        due_date: m.due_date
      }))
    });

    res.json({ message: 'Application accepted. Contract generated.', project });
  } catch (err) {
    res.status(500).json({ message: 'Error applying for project' });
  }
};

// Accept Contract
exports.acceptContract = async (req, res) => {
  try {
    const { id } = req.params; // Contract ID
    const contract = await Contract.findById(id);
    const userId = req.user._id.toString();

    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    if (contract.client_id.toString() === userId) {
      contract.acceptance.client_accepted_at = new Date();
    } else if (contract.worker_ids.map(w => w.toString()).includes(userId)) {
      contract.acceptance.worker_accepted_at = new Date();
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }

    if (contract.acceptance.client_accepted_at && contract.acceptance.worker_accepted_at) {
      contract.status = 'active';
      // Activate project
      await Project.findByIdAndUpdate(contract.project_id, { status: 'active' });
    }

    await contract.save();
    res.json({ message: 'Contract updated', contract });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting contract' });
  }
};

// Submit Milestone
exports.submitMilestone = async (req, res) => {
  try {
    const { id } = req.params; // Milestone ID
    const { github_url, demo_url, notes } = req.body;
    const milestone = await Milestone.findById(id);

    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

    const project = await Project.findById(milestone.project_id);
    if (!project.team.worker_ids.includes(req.user._id)) {
        return res.status(403).json({ message: 'Unauthorized: You are not assigned to this project.' });
    }

    milestone.status = 'submitted';
    milestone.submission_proof = { github_url, demo_url, notes, submitted_at: new Date() };
    await milestone.save();

    res.json({ message: 'Milestone submitted for review.', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting milestone' });
  }
};

// Approve Milestone (Escrow Payout)
exports.approveMilestone = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const milestone = await Milestone.findById(id).session(session);
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

    const project = await Project.findById(milestone.project_id).session(session);
    if (project.client_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (milestone.status !== 'submitted') {
        return res.status(400).json({ message: 'Milestone is not in submitted state.' });
    }

    // Payout logic
    const workerId = project.team.worker_ids[0]; // Simplified for now
    const amount = milestone.amount_credits;

    const worker = await User.findById(workerId).session(session);
    const client = await User.findById(project.client_id).session(session);

    // Recording Transaction
    await Transaction.create([{
      tx_type: 'escrow_release',
      from_user_id: client._id,
      to_user_id: worker._id,
      project_id: project._id,
      milestone_id: milestone._id,
      amount,
      balance_snapshot: {
        before: worker.credits_wallet.available,
        after: worker.credits_wallet.available + amount
      },
      metadata: { reason: `Payout for milestone: ${milestone.title}` }
    }], { session });

    // Update Wallets
    client.credits_wallet.escrow_locked -= amount;
    worker.credits_wallet.available += amount;
    worker.credits_wallet.lifetime_earned += amount;
    await client.save({ session });
    await worker.save({ session });

    milestone.status = 'paid';
    await milestone.save({ session });

    // Finalize Project if all milestones are paid
    const remaining = await Milestone.countDocuments({ project_id: project._id, status: { $ne: 'paid' } }).session(session);
    if (remaining === 0) {
      project.status = 'completed';
      await project.save({ session });
    }

    await session.commitTransaction();
    res.json({ message: 'Milestone approved and payout released.', milestone });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: 'Error during milestone approval and payout' });
  } finally {
    session.endSession();
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
    try {
        const { type, status } = req.query;
        let query = {};
        if (type) query.type = type;
        if (status) query.status = status;
        
        const projects = await Project.find(query).populate('client_id', 'name roles mode_status reputation');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error searching projects' });
    }
};

// Get Project and its content (Contracts, Milestones)
exports.getProjectDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate('client_id', 'name email').populate('team.worker_ids', 'name email reputation');
        if (!project) return res.status(404).json({ message: 'Not found' });

        const milestones = await Milestone.find({ project_id: id });
        const contract = await Contract.findOne({ project_id: id, status: { $ne: 'rejected' } });

        res.json({ project, milestones, contract });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching project details' });
    }
};
