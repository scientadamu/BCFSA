const express = require('express');
const router = express.Router();

// @route   POST /api/uploads
// @desc    Upload files
// @access  Private
router.post('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Upload endpoint',
      data: null
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
