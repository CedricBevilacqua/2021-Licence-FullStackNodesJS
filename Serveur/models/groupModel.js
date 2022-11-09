const mongoose = require('mongoose');

const StudentSchema = require('./studentModel');

// definition of schema for groups
const groupSchema = new mongoose.Schema({
    numGroup : {type: Number},
    student : StudentSchema
});

// export the schema
module.exports = groupSchema;

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/dbConnection');
const Groups = dbConnection.model('Group',groupSchema,'groups');

// export the model
module.exports.model = Groups;
