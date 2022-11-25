const express = require('express');
const {test} = require('../controller/index')
const router = express.Router();

// http://localhost:5001/test
router.get('/test',test);


module.exports = router;