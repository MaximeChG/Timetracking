// Includes for core node modules used for this file
const path = require('path');

// Includes external node modules
const express = require('express');

// Includes for files I created
const generalControllers = require('../controllers/general');

const router = express.Router();

router.get('/', generalControllers.getIndex);
router.post('/fillTask', generalControllers.postFillTask);
router.post('/add-time',generalControllers.postAddTime);

module.exports = router;