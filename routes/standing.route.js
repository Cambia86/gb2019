const express = require('express');
const router = express.Router();

const standing_controller = require('../controllers/standing.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', standing_controller.standing_get);

module.exports = router;