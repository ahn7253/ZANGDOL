var express = require('express');
var router = express.Router();

var mainRouter = require('./main/main');
var animalRouter = require('./animal/animal');
var volunteerRouter = require('./volunteer/volunteer');
var mshelterRouter = require('./mshelter/mshelter');
var notifyRouter = require('./notify/notify');
var discoverRouter = require('./discover/discover');

router.use('/main', mainRouter);
router.use('/animal', animalRouter);
router.use('/volunteer', volunteerRouter);
router.use('/mshelter', mshelterRouter);
router.use('/notify', notifyRouter);
router.use('/discover', discoverRouter);

module.exports = router;