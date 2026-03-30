const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tx_type: {
    type: String,
    enum: ['earn_payout', 'escrow_lock', 'escrow_release', 'reward_redeem', 'bonus', 'refund', 'penalty', 'initial_seed'],
    required: true
  },
  from_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null for system or external source
  },
  to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  milestone_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
    default: null
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  balance_snapshot: {
    before: Number,
    after: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'reversed'],
    default: 'confirmed'
  },
  metadata: {
    reason: String,
    external_ref: String,
    system_notes: String
  }
}, {
  timestamps: true
});

transactionSchema.index({ to_user_id: 1, createdAt: -1 });
transactionSchema.index({ project_id: 1, tx_type: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
