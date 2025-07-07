const express = require('express');
const router = express.Router();

// @route   GET /api/assessments
// @desc    Get all assessments
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Assessments endpoint',
      data: []
    });
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
