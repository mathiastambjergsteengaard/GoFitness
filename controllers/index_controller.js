var models = require('../models/db');

module.exports.index = function (req, res) {
  models.Finished.find({}, function(err, fin) {
      if (err) return console.error(err);
      res.render('index', { programs: fin, title: "GoFitness"});
    });
};

