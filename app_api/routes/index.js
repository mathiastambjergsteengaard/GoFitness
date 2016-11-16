var express = require('express');
var router = express.Router();
var ctrlprogram = require('../controllers/programs_controller');
var ctrlexercise = require('../controllers/exercises_controller');
var ctrlfinished = require('../controllers/finished_controller');
var ctrlAuth = require('../controllers/authentication');



router.get('/programs', ctrlprogram.programsList);
router.post('/programs', ctrlprogram.create);
router.get('/finished', ctrlfinished.finishedList);
router.post('/finished', ctrlfinished.create);
router.get('/programs/:program_id', ctrlprogram.programsReadOne);
router.post('/programs/:program_id/exercise', ctrlexercise.create);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
