var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main')
var ctrlprogram = require('../controllers/programs_controller');
var ctrlexercise = require('../controllers/excercises_controller');

router.get('/', ctrlMain.index);
router.get('/program/new', ctrlprogram.new);
router.post('/program/create', ctrlprogram.create);
router.get('/program/edit', ctrlprogram.edit);
router.post('/program/update', ctrlprogram.update);
router.get('/program/log', ctrlprogram.log);
router.get('/excercise/new', ctrlexercise.new);
router.post('/excercise/new', ctrlexercise.new);
router.post('/excercise/create', ctrlexercise.create);


module.exports = router;
