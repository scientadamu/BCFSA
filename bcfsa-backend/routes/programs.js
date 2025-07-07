const express = require('express');
const { Program } = require('../models');
const router = express.Router();

// @route   GET /api/programs
// @desc    Get all programs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, level, active } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (category) {
      whereClause.category = category;
    }

    if (level) {
      whereClause.level = level;
    }

    if (active !== undefined) {
      whereClause.isActive = active === 'true';
      whereClause.isPublished = true;
    }

    const programs = await Program.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: programs.rows,
      pagination: {
        total: programs.count,
        page: parseInt(page),
        pages: Math.ceil(programs.count / limit),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/programs/:id
// @desc    Get program by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });

  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/programs
// @desc    Create new program
// @access  Private (Admin/Trainer)
router.post('/', async (req, res) => {
  try {
    const program = await Program.create({
      ...req.body,
      createdBy: 1 // This should come from authenticated user
    });

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });

  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/programs/:id
// @desc    Update program
// @access  Private (Admin/Trainer)
router.put('/:id', async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    const updatedProgram = await program.update({
      ...req.body,
      updatedBy: 1 // This should come from authenticated user
    });

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: updatedProgram
    });

  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/programs/:id
// @desc    Delete program
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    await program.destroy();

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });

  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
