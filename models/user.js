'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    rut: String,
    image: String,
    year: Number,
    role: String,
    date: String,
    state: String
});

module.exports = mongoose.model('User', UserSchema);