const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const competition_controller = require('../controllers/competition.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', competition_controller.competition_get);
router.post('/create', competition_controller.competition_create);
router.put('/:id/update', competition_controller.competition_Update);
router.delete('/:id', competition_controller.competition_delete);


module.exports = router;