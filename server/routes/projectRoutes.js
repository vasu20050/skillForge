const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  getProjectDetails,
  applyForProject,
  acceptContract,
  submitMilestone,
  approveMilestone
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { isVerifiedEarner, roleMiddleware } = require('../middleware/roleMiddleware');

// Get all (public listings)
router.get('/', protect, getProjects);

// Create Project (Client only, funding required)
router.post('/', protect, roleMiddleware('client'), createProject);

// Project Details
router.get('/:id', protect, getProjectDetails);

// Work Workflow
router.post('/:id/apply', protect, applyForProject); // Only verified earners for earn projects
router.post('/contract/:id/accept', protect, acceptContract);
router.post('/milestones/:id/submit', protect, submitMilestone);
router.post('/milestones/:id/approve', protect, approveMilestone);

module.exports = router;
