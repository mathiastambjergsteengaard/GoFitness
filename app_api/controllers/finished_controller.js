var models = require('../models/db');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.finishedList = function (req, res) {
  models.Finished.find({}, function(err, finished) {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 200, finished);
      }
  });
};

module.exports.create = function (req, res) {
console.log(req.body);
  if(req.body.name && req.body.date){
    var finished = new models.Finished({
      name: req.body.name,
      date: req.body.date
    });
    finished.save(function(err, finished) {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 201, {"status" : "success"});
      }
    });
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, name and date required"
    })
  }
};