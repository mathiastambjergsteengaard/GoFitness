var mongoose = require( 'mongoose' );
var autoIncrement = require('mongoose-auto-increment');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var dbURI = "mongodb://Group24:Group24@ds149577.mlab.com:49577/gofitness;"
var connection = mongoose.createConnection(dbURI);
mongoose.connect(dbURI);

autoIncrement.initialize(connection);

var excerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
  set_number: Number,
  duration_minutes: Number,
  duration_seconds: Number,
  repetitions: Number
});

var programSchema = new mongoose.Schema({
  name: String,
  excercises: [excerciseSchema]
});

var finishedSchema = new mongoose.Schema({
  name: String,
  date: String
});

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  }, name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'thisIsSecret' );
};


programSchema.plugin(autoIncrement.plugin, 'Program');
var Program = mongoose.model('Program', programSchema);
var Excercise = mongoose.model('Excercise', excerciseSchema);
var Finished = mongoose.model('Finished', finishedSchema);

exports.Program = Program;
exports.Excercise = Excercise;
exports.Finished = Finished;

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});


