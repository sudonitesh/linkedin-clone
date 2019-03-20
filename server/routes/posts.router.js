const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => {
  res.send('posts api')
});

module.exports = router;