const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get wallet details
exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('credits_wallet');
    if (!user || !user.credits_wallet) {
      return res.json({ available: 0, escrow_locked: 0, lifetime_earned: 0, lifetime_spent: 0 });
    }
    res.json(user.credits_wallet);
  } catch (err) {
    console.error('Wallet Fetch Error:', err);
    res.status(500).json({ message: 'Error fetching wallet' });
  }
};

// Get transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from_user_id: req.user._id }, { to_user_id: req.user._id }]
    }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching historical transactions' });
  }
};

// Redeem Rewards
exports.redeemReward = async (req, res) => {
  try {
    const { rewardId, cost } = req.body;
    const user = await User.findById(req.user._id);

    if (user.credits_wallet.available < cost) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }

    // Immutable Transaction
    const tx = await Transaction.create({
      tx_type: 'reward_redeem',
      from_user_id: user._id,
      amount: cost,
      balance_snapshot: {
        before: user.credits_wallet.available,
        after: user.credits_wallet.available - cost
      },
      metadata: { reason: `Redeemed reward: ${rewardId}` }
    });

    user.credits_wallet.available -= cost;
    user.credits_wallet.lifetime_spent += cost;
    await user.save();

    res.json({ message: 'Reward redeemed successfully', tx, wallet: user.credits_wallet });
  } catch (err) {
    res.status(500).json({ message: 'Error during reward redemption' });
  }
};
