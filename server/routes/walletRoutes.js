const express = require('express');
const router = express.Router();
const { getWallet, getTransactions, redeemReward } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/balance', getWallet);
router.get('/history', getTransactions);
router.post('/redeem', redeemReward);

module.exports = router;
