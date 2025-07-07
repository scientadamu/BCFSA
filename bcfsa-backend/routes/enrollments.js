const express = require('express');
const { Enrollment, User, Program } = require('../models');
const router = express.Router();

// @route   GET /api/enrollments
// @desc    Get all enrollments
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, programId, studentId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }

    if (programId) {
      whereClause.programId = programId;
    }

    if (studentId) {
      whereClause.studentId = studentId;
    }

    const enrollments = await Enrollment.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email', 'studentId']
        },
        {
          model: Program,
          as: 'program',
          attributes: ['id', 'title', 'category', 'level']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: enrollments.rows,
      pagination: {
        total: enrollments.count,
        page: parseInt(page),
        pages: Math.ceil(enrollments.count / limit),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/enrollments
// @desc    Create new enrollment
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { studentId, programId } = req.body;

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      where: { studentId, programId }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this program'
      });
    }

    const enrollment = await Enrollment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      data: enrollment
    });

  } catch (error) {
    console.error('Create enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
