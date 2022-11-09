const mongoose = require('mongoose');

// definition of schema for students
const studentSchema = new mongoose.Schema({
  name : {type: String, require: true},
  firstnames : {type: String, require: true},
  numStudent : {type: Number, unique: true, require: true}
});

// export the schema
module.exports = studentSchema;


// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/dbConnection');
const Students = dbConnection.model('Student',studentSchema,'students');

// export the model
module.exports.model = Students;
