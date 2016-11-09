var models = require('../models/db');

module.exports.new = function (req, res) {
  res.render('programs/new');
};

module.exports.create = function (req, res) {
  res.redirect('/excercises/new')
};

module.exports.edit = function (req, res) {
  models.Program.find({}, function(err, fin) {
      if (err) return console.error(err);
      res.render('programs/edit', { programs: fin });
  });
};

module.exports.update = function (req, res) {
  console.log(req.body);
  var fin = new models.Finished({
    name: req.body.name,
    date: req.body.date
  });
  fin.save(function(err, fin) {
    if (err) return console.error(err);
  });
  res.redirect('/');
};

module.exports.log = function (req, res) {
  models.Finished.find({}, function(err, fin) {
      if (err) return console.error(err);
      res.render('programs/log', { programs: fin });
    });
};
