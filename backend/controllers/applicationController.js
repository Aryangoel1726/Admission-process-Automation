const Application = require('../models/Application');

/**
 * @desc    Create a new admission application
 * @route   POST /api/applications
 * @access  Private (student)
 */
const createApplication = async (req, res) => {
  try {
    const { program, academicYear } = req.body;

    // Check for duplicate application
    const existing = await Application.findOne({
      student: req.user._id,
      program,
      academicYear: academicYear || '2026-2027',
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this program in this academic year',
      });
    }

    const application = await Application.create({
      student: req.user._id,
      program,
      academicYear: academicYear || '2026-2027',
    });

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      data: application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all applications for the logged-in student
 * @route   GET /api/applications/my
 * @access  Private (student)
 */
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id }).sort('-createdAt');
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single application by ID
 * @route   GET /api/applications/:id
 * @access  Private
 */
const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'student',
      'firstName lastName email phone'
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Students can only view their own applications
    if (
      req.user.role === 'student' &&
      application.student._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Submit a draft application
 * @route   PUT /api/applications/:id/submit
 * @access  Private (student)
 */
const submitApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (application.status !== 'draft') {
      return res.status(400).json({ success: false, message: 'Application is already submitted' });
    }

    // TODO: Validate that all required documents are uploaded before submission

    application.status = 'submitted';
    await application.save();

    res.json({ success: true, message: 'Application submitted successfully', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TODO: Implement these admin-only controllers
// - getAllApplications (admin)
// - reviewApplication (admin — approve/reject/waitlist)
// - generateMeritList (admin)

module.exports = { createApplication, getMyApplications, getApplication, submitApplication };
