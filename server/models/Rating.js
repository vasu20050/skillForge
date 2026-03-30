const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  rater_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role_context: {
    type: String,
    enum: ['client_to_worker', 'worker_to_client'],
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    trim: true
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure unique rating per project per rater per context
ratingSchema.index({ project_id: 1, rater_id: 1, role_context: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
