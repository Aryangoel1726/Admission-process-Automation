const Student = require('../models/Student');
const { generateToken } = require('../utils/generateToken');

/**
 * @desc    Register a new student
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, dateOfBirth, gender } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create student
    const student = await Student.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
    });

    // Generate token
    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: student.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Login student
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find student and include password for comparison
    const student = await Student.findOne({ email }).select('+password');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(student._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: student.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get current logged-in student profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};

// TODO: Implement forgot password, reset password, update profile

module.exports = { registerStudent, loginStudent, getMe };
