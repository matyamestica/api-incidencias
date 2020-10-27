'use strict'

var express = require('express');
var AnswerController = require('../controllers/answer');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/answers', md_auth.ensureAuth, AnswerController.getAnswers);
api.post('/answers', md_auth.ensureAuth, AnswerController.saveAnswer);

module.exports = api;