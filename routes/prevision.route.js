const express = require('express');
const router = express.Router();

const prevision_controller = require('../controllers/prevision.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', prevision_controller.get_prevision);
router.get('/lastresult/:id/:storeprevision', prevision_controller.get_prevision_lastResult);
router.get('/allweekend/:storeprevision', prevision_controller.get_prevision_week);


router.get('/result/:id/:matchDay', prevision_controller.get_prevision_result);


module.exports = router; 