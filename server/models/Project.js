const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Graphic Design', 'Web Development', 'Content Writing', 
      'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
    ],
    required: true
  },
  rewardParams: {
    credits: {
      type: Number,
      required: true,
      min: 1
    }
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'submitted', 'completed', 'cancelled', 'disputed', 'revision'],
    default: 'open'
  },
  deadline: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default 7 days
  },
  disputeStatus: {
    type: String,
    enum: ['none', 'level1', 'level2', 'admin', 'resolved'],
    default: 'none'
  },
  disputeReason: {
    type: String
  },
  isVerifiedPortfolioEntry: {
    type: Boolean,
    default: false
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliverables: [{
    fileUrl: String,
    description: String,
    submittedAt: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
