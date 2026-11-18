const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getApplication,
  submitApplication,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// Student routes
router.post('/', protect, createApplication);
router.get('/my', protect, getMyApplications);
router.get('/:id', protect, getApplication);
router.put('/:id/submit', protect, submitApplication);

// TODO: Admin routes
// router.get('/', protect, authorize('admin'), getAllApplications);
// router.put('/:id/review', protect, authorize('admin'), reviewApplication);
// router.get('/merit-list/:program', protect, authorize('admin'), generateMeritList);

module.exports = router;
