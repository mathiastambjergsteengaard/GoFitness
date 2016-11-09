var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/excercises';
mongoose.connect(dbURI);

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


