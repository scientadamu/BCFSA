const express = require('express');
const router = express.Router();

// @route   GET /api/reports
// @desc    Get reports
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Reports endpoint',
      data: []
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
