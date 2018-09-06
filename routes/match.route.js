const express = require('express');
const router = express.Router();

const match_controller = require('../controllers/match.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', match_controller.match_get);


module.exports = router;