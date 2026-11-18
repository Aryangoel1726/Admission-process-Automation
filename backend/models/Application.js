const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    // Program applied for
    program: {
      type: String,
      required: [true, 'Program is required'],
      enum: [
        'B.Tech Computer Science',
        'B.Tech Electronics',
        'B.Tech Mechanical',
        'B.Tech Civil',
        'BBA',
        'BCA',
        'MBA',
        'MCA',
        'M.Tech Computer Science',
        'M.Tech Electronics',
      ],
    },
    academicYear: {
      type: String,
      required: true,
      default: '2026-2027',
    },
    // Application status workflow
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'waitlisted'],
      default: 'draft',
    },
    // Document references (TODO: implement file upload)
    documents: {
      tenthMarksheet: { type: String, default: null },
      twelfthMarksheet: { type: String, default: null },
      photograph: { type: String, default: null },
      idProof: { type: String, default: null },
      entranceScorecard: { type: String, default: null },
    },
    // Admin review
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', // Admin is also stored in Student model with role='admin'
      default: null,
    },
    reviewRemarks: { type: String, default: '' },
    reviewedAt: { type: Date, default: null },

    // Merit score (calculated — TODO: implement algorithm)
    meritScore: { type: Number, default: null },

    // Fee payment (TODO: integrate payment gateway)
    feeStatus: {
      type: String,
      enum: ['unpaid', 'pending', 'paid'],
      default: 'unpaid',
    },
    feeAmount: { type: Number, default: null },
    feePaidAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Index for quick lookups
applicationSchema.index({ student: 1, program: 1, academicYear: 1 }, { unique: true });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
