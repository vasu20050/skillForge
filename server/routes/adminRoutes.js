const express = require('express');
const router = express.Router();
const { listUsers, listProjects, seedLearnProjects, verifyUserStatus, evaluateLearnSubmission } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(roleMiddleware('admin'));

router.get('/users', listUsers);
router.get('/projects', listProjects);
router.post('/verify-user', verifyUserStatus);
router.post('/seed-learn-projects', seedLearnProjects);
router.post('/evaluate-learn', evaluateLearnSubmission);

module.exports = router;