'use strict'

var express = require('express');
var ProblemController = require('../controllers/problem');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/problem/:id', md_auth.ensureAuth, ProblemController.getProblem);
api.get('/problems/:page?', /*md_auth.ensureAuth,*/ ProblemController.getProblems);
api.post('/problem', md_auth.ensureAuth, ProblemController.saveProblem);
api.put('/update-problem/:id', md_auth.ensureAuth, ProblemController.updateProblem);

module.exports = api;