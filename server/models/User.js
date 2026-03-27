const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  photoUrl: {
    type: String,
    default: ''
  },
  headline: {
    type: String,
    default: 'Campus Pioneer'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // Validation is handled in the controller (authController.js)
  },
  password: {
    type: String,
    required: true,
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['worker', 'client', 'admin'],
    default: 'worker'
  },
  credits: {
    type: Number,
    default: 100 // 100 starter credits
  },
  skills: [{
    type: String,
    enum: [
      'Graphic Design', 'Web Development', 'Content Writing', 
      'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
    ]
  }],
  reputationScore: {
    type: Number,
    default: 0
  },
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  completionRate: {
    type: Number,
    default: 100 // Starts at 100%
  },
  onTimeDeliveryRate: {
    type: Number,
    default: 100
  },
  projectsCompleted: {
    type: Number,
    default: 0
  },
  disputesLost: {
    type: Number,
    default: 0
  },
  totalProjectsValue: {
    type: Number,
    default: 0
  },
  verifiedBadges: [{
    type: String
  }],
  isVerifiedContent: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
