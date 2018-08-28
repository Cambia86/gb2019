const express = require('express');
const router = express.Router();

const prevision_controller = require('../controllers/prevision.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', prevision_controller.get_prevision);

module.exports = router;