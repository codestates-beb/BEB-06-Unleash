const express = require('express');
const {claimVC,requestVC} = require('../controller/did.js')
const router = express.Router();

// http://localhost:5001/did/claimVC
router.post('/claimVC',claimVC);

// http://localhost:5001/did/requestVC
router.post('/requestVC',requestVC);


module.exports = router;