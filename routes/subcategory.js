'use strict'

var express = require('express');
var SubcategoryController = require('../controllers/subcategory');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/subcategory/:id', md_auth.ensureAuth, SubcategoryController.getSubcategory);
api.get('/subcategories/:page?', md_auth.ensureAuth, SubcategoryController.getSubcategories);
api.post('/subcategory', md_auth.ensureAuth, SubcategoryController.saveSubcategory);
api.put('/update-subcategory/:id', md_auth.ensureAuth, SubcategoryController.updateSubcategory);
api.delete('/subcategory/:id', md_auth.ensureAuth, SubcategoryController.deleteSubcategory);




module.exports = api;