var models = require('../models/db');

module.exports.new = function (req, res) {
  var name = req.query.program_name;
  console.log(name);
  if(req.body.name != undefined)
  {
    var program = new models.Program({
      name: req.body.name
    });
    program.save(function(err, program) {
      if (err) return console.error(err);
    });
    name = req.body.name;
  }
  res.render('excercises/new', { program_name: name });
};

module.exports.create = function (req, res) {
  var excercise = new models.Excercise({
    name: req.body.name,
    description: req.body.description,
    set_number: req.body.set_number,
    duration_minutes: req.body.duration_minutes,
    duration_seconds: req.body.duration_seconds,
    repetitions: req.body.repetitions
  });
  excercise.save(function(err, excercise) {
    if (err) return console.error(err);
    console.dir(excercise);
  });
  // console.log(req.body.name)
  models.Program.find({ name: req.body.program_name}, function(err, program) {
    if (err) return console.error(err);
    program[0].excercises.push(excercise);
    program[0].save(function(err, program) {
      if (err) return console.error(err);
    });
    res.redirect("/excercise/new?program_name=" + program[0].name);
  });
};
