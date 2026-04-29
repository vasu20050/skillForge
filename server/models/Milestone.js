const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  amount_credits: {
    type: Number,
    required: true,
    min: 0
  },
  percentage_split: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  due_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected', 'disputed', 'paid'],
    default: 'pending'
  },
  submission_proof: {
    github_url: String,
    demo_url: String,
    file_url: String,
    video_url: String,
    notes: String,
    submitted_at: Date
  },
  ai_audit: {
    status: {
      type: String,
      enum: ['none', 'pending', 'passed', 'flagged', 'failed'],
      default: 'none'
    },
    score: Number,
    feedback: String,
    audited_at: Date
  }
}, {
  timestamps: true
});

milestoneSchema.index({ project_id: 1, status: 1 });
milestoneSchema.index({ due_date: 1 });

module.exports = mongoose.model('Milestone', milestoneSchema);
