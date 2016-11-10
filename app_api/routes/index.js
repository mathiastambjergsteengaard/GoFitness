var express = require('express');
var router = express.Router();
var ctrlprogram = require('../controllers/programs_controller');
var ctrlexercise = require('../controllers/exercises_controller');



router.get('/programs', ctrlprogram.programsList);
router.post('/programs', ctrlprogram.create);
router.get('/programs/:program_id', ctrlprogram.programsReadOne);
router.post('/programs/:program_id/exercise', ctrlexercise.create);
// router.get('/program/log', ctrlprogram.log);
// router.get('/excercise/new', ctrlexercise.new);
// router.post('/excercise/new', ctrlexercise.new);
// router.post('/excercise/create', ctrlexercise.create);


module.exports = router;
