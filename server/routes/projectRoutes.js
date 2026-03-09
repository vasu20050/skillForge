const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  assignProject, 
  submitWork, 
  approveWork 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/projects
// @desc    Create a new project (Client only)
router.post('/', protect, createProject);

// @route   GET /api/projects
// @desc    Get all active projects
router.get('/', protect, getProjects);

// @route   POST /api/projects/:id/assign
// @desc    Accept a project (Worker only)
router.post('/:id/assign', protect, assignProject);

// @route   POST /api/projects/:id/submit
// @desc    Submit deliverables (Worker only)
router.post('/:id/submit', protect, submitWork);

// @route   POST /api/projects/:id/approve
// @desc    Approve project and pay credits (Client only)
router.post('/:id/approve', protect, approveWork);

module.exports = router;
