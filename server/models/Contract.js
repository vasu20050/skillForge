const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  scope: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    outcomes: [String]
  },
  deliverables: [{
    title: { type: String, required: true },
    format: { type: String, required: true }, // 'github_url', 'demo_url', 'file_submission'
    due_date: { type: Date, required: true }
  }],
  milestones_snapshot: [{
    milestone_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' },
    title: String,
    credits: Number,
    percentage: Number,
    due_date: Date
  }],
  terms: {
    base_credits: { type: Number, required: true },
    bonus_credits: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    dispute_rule: { type: String, enum: ['admin', 'jury'], default: 'admin' }
  },
  acceptance: {
    client_accepted_at: Date,
    worker_accepted_at: Date
  },
  status: {
    type: String,
    enum: ['draft', 'pending_acceptance', 'active', 'rejected', 'superseded', 'completed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

contractSchema.index({ project_id: 1, status: 1 });
contractSchema.index({ client_id: 1, createdAt: -1 });

module.exports = mongoose.model('Contract', contractSchema);
