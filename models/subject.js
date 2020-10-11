'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = Schema({
    name: String,
    code: String,
    teacher: String
});

module.exports = mongoose.model('Subject', SubjectSchema);