var models = require('../models/db');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var addExercise = function(req, res, program) {
  var exercise = new models.Excercise({
    name: req.body.name,
    description: req.body.description,
    set_number: req.body.set_number,
    duration_minutes: req.body.duration_minutes,
    duration_seconds: req.body.duration_seconds,
    repetitions: req.body.repetitions
  });
  program.excercises.push(exercise);
  program.save(function(err, program) {
    if (err)
    {
      sendJsonResponse(res, 500, err);
    }
    else
    {
      sendJsonResponse(res, 201, {"status" : "success"});
    }
  });
};

module.exports.create = function (req, res) {
  if (req.params.program_id) {
    models.Program
      .findById(req.params.program_id)
      .select('excercises')
      .exec(
        function(err, program)
        {
          if (err)
          {
            sendJsonResponse(res, 400, err);
          }
          else
          {
            addExercise(req, res, program);
          }
        }
      );
  }
  else
  {
    sendJsonResponse(res, 404, {"message": "Not found, program_id required"});
  }
};




