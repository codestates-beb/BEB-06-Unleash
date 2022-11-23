const express = require('express');
const {claimVC} = require('../controller/did.js')
const router = express.Router();

// http://localhost:5001/did/claimVC
router.post('/claimVC',claimVC);


module.exports = router;