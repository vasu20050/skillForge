const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  roles: {
    type: [String],
    enum: ['student', 'client', 'admin'],
    default: ['student']
  },
  mode_status: {
    type: String,
    enum: ['learner', 'verified_earner', 'suspended'],
    default: 'learner'
  },
  profile: {
    department: String,
    year: Number,
    skills: [String],
    photoUrl: String,
    headline: {
      type: String,
      default: 'Campus Pioneer'
    }
  },
  reputation: {
    score: { type: Number, default: 0, min: 0, max: 100 },
    completion_rate: { type: Number, default: 0 },
    on_time_rate: { type: Number, default: 0 },
    repeat_collab_rate: { type: Number, default: 0 }
  },
  credits_wallet: {
    available: { type: Number, default: 0 },
    escrow_locked: { type: Number, default: 0 },
    lifetime_earned: { type: Number, default: 0 },
    lifetime_spent: { type: Number, default: 0 }
  },
  verification: {
    completed_learn_projects: { type: Number, default: 0 },
    average_learn_rating: { type: Number, default: 0 },
    verified_at: Date
  }
}, {
  timestamps: true
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ mode_status: 1, 'reputation.score': -1 });

module.exports = mongoose.model('User', userSchema);
