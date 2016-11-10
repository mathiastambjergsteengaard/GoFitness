var models = require('../models/db');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.programsList = function (req, res) {
  models.Program.find({}, function(err, programs) {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 200, programs);
      }
  });
};

module.exports.create = function (req, res) {
  if(req.body.name){
    var program = new models.Program({
      name: req.body.name
    });
    program.save(function(err, program) {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 201, {"status" : "success"});
      }
    });
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, name required"
    })
  }
};

module.exports.programsReadOne = function (req, res) {
  if (req.params.program_id) {
    models.Program
      .findById(req.params.program_id)
      .exec(
        function(err, program)
        {
          if (err)
          {
            sendJsonResponse(res, 400, err);
          }
          else
          {
            console.log(program);
            sendJsonResponse(res, 200, program);
          }
        }
      );
  }
  else
  {
    sendJsonResponse(res, 404, {"message": "Not found, program_id required"});
  }
};


