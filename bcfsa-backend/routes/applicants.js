const express = require('express');
const { body, validationResult } = require('express-validator');
const { Applicant, User } = require('../models');
const router = express.Router();

// Validation middleware
const validateApplicant = [
  body('firstName').trim().isLength({ min: 2, max: 100 }).withMessage('First name must be between 2 and 100 characters'),
  body('lastName').trim().isLength({ min: 2, max: 100 }).withMessage('Last name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').trim().isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters'),
  body('dateOfBirth').isDate().withMessage('Please provide a valid date of birth'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('address').trim().isLength({ min: 10 }).withMessage('Address must be at least 10 characters'),
  body('education').trim().isLength({ min: 5 }).withMessage('Education must be at least 5 characters'),
  body('motivation').trim().isLength({ min: 20 }).withMessage('Motivation must be at least 20 characters'),
  body('program').trim().isLength({ min: 3 }).withMessage('Program must be specified')
];

// GET /api/applicants - Get all applicants
router.get('/', async (req, res) => {
  try {
    const { status, program, page = 1, limit = 50 } = req.query;
    
    const whereClause = {};
    if (status) whereClause.status = status;
    if (program) whereClause.program = program;

    const offset = (page - 1) * limit;

    const applicants = await Applicant.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: applicants.rows,
      pagination: {
        total: applicants.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(applicants.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applicants',
      error: error.message
    });
  }
});

// GET /api/applicants/:id - Get single applicant
router.get('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    res.json({
      success: true,
      data: applicant
    });
  } catch (error) {
    console.error('Error fetching applicant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applicant',
      error: error.message
    });
  }
});

// POST /api/applicants - Create new applicant
router.post('/', validateApplicant, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if email already exists
    const existingApplicant = await Applicant.findOne({
      where: { email: req.body.email }
    });

    if (existingApplicant) {
      return res.status(400).json({
        success: false,
        message: 'An applicant with this email already exists'
      });
    }

    const applicant = await Applicant.create({
      ...req.body,
      applicationDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: applicant
    });
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// PUT /api/applicants/:id - Update applicant
router.put('/:id', validateApplicant, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const applicant = await Applicant.findByPk(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (req.body.email !== applicant.email) {
      const existingApplicant = await Applicant.findOne({
        where: { email: req.body.email }
      });

      if (existingApplicant) {
        return res.status(400).json({
          success: false,
          message: 'An applicant with this email already exists'
        });
      }
    }

    await applicant.update(req.body);

    res.json({
      success: true,
      message: 'Applicant updated successfully',
      data: applicant
    });
  } catch (error) {
    console.error('Error updating applicant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update applicant',
      error: error.message
    });
  }
});

// PATCH /api/applicants/:id/status - Update applicant status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, reviewedBy, notes } = req.body;
    
    if (!['pending', 'reviewed', 'admitted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, reviewed, admitted, or rejected'
      });
    }

    const applicant = await Applicant.findByPk(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    const updateData = { 
      status,
      reviewedAt: new Date()
    };

    if (reviewedBy) updateData.reviewedBy = reviewedBy;
    if (notes) updateData.notes = notes;
    if (status === 'admitted') updateData.admittedAt = new Date();

    await applicant.update(updateData);

    res.json({
      success: true,
      message: 'Applicant status updated successfully',
      data: applicant
    });
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update applicant status',
      error: error.message
    });
  }
});

// POST /api/applicants/:id/admit - Admit applicant and create student account
router.post('/:id/admit', async (req, res) => {
  try {
    const { admissionNumber, reviewedBy } = req.body;
    
    const applicant = await Applicant.findByPk(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    if (applicant.status === 'admitted') {
      return res.status(400).json({
        success: false,
        message: 'Applicant has already been admitted'
      });
    }

    // Update applicant status
    await applicant.update({
      status: 'admitted',
      admittedAt: new Date(),
      admissionNumber,
      reviewedBy
    });

    res.json({
      success: true,
      message: 'Applicant admitted successfully',
      data: applicant
    });
  } catch (error) {
    console.error('Error admitting applicant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to admit applicant',
      error: error.message
    });
  }
});

// DELETE /api/applicants/:id - Delete applicant
router.delete('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    await applicant.destroy();

    res.json({
      success: true,
      message: 'Applicant deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting applicant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete applicant',
      error: error.message
    });
  }
});

module.exports = router;
