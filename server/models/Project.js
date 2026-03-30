const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['learn_dummy', 'earn_real'],
    required: true,
    default: 'learn_dummy'
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
  category: {
    type: String,
    enum: [
      'Graphic Design', 'Web Development', 'Content Writing', 
      'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
    ],
    required: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  team: {
    worker_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    apprentice_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  status: {
    type: String,
    enum: ['draft', 'open', 'pending_contract', 'active', 'submitted', 'completed', 'disputed', 'cancelled'],
    default: 'draft'
  },
  credits_total: {
    type: Number,
    required: true,
    min: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  verification_required: {
    type: Boolean,
    default: false
  },
  proof_requirements: {
    type: [String],
    enum: ['github_url', 'demo_url', 'file_submission'],
    default: ['github_url']
  }
}, {
  timestamps: true
});

projectSchema.index({ type: 1, status: 1 });
projectSchema.index({ client_id: 1, createdAt: -1 });
projectSchema.index({ deadline: 1 });

module.exports = mongoose.model('Project', projectSchema);
