'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/category/:id', md_auth.ensureAuth, CategoryController.getCategory);
api.get('/categories/:page?', md_auth.ensureAuth, CategoryController.getCategories);
api.post('/category', md_auth.ensureAuth, CategoryController.saveCategory);
api.put('/update-category/:id', md_auth.ensureAuth, CategoryController.updateCategory);
api.delete('/category/:id', md_auth.ensureAuth, CategoryController.deleteCategory);

module.exports = api;