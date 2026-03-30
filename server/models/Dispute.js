const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  milestone_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
    default: null
  },
  raised_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  against_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason_code: {
    type: String,
    enum: ['scoping', 'quality', 'deadline', 'payment', 'other'],
    required: true
  },
  evidence: {
    type: [String], // URLs to screenshots, chat logs, etc.
    default: []
  },
  resolution_mode: {
    type: String,
    enum: ['admin', 'jury'],
    default: 'admin'
  },
  jury: {
    voter_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    voter_rewards: { type: Number, default: 10 }, // 10 credits for voting
    votes: [{
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verdict: { type: String, enum: ['client', 'worker', 'split'] },
      reason: String,
      voted_at: { type: Date, default: Date.now }
    }]
  },
  verdict: {
    winner: { type: String, enum: ['client', 'worker', 'split', 'none'], default: 'none' },
    percentage_split: { type: Number, default: 0 }, // If split, percentage for worker
    admin_notes: String,
    resolved_at: Date
  },
  status: {
    type: String,
    enum: ['open', 'investigating', 'voting', 'resolved', 'escalated'],
    default: 'open'
  }
}, {
  timestamps: true
});

disputeSchema.index({ status: 1, createdAt: -1 });
disputeSchema.index({ project_id: 1 });

module.exports = mongoose.model('Dispute', disputeSchema);
