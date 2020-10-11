'use strict'

var moment = require('moment');
var path = require('path');
var fs = require('fs');

var Category = require('../models/category');
var Problem = require('../models/problem');
var Subcategory = require('../models/subcategory');
var Subject = require('../models/subject');
var User = require('../models/user');

function getCategory(req, res){
    var categoryId = req.params.id;

    Category.findById(categoryId, (err, category) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!category){
                res.status(404).send({message: 'La categoría no existe'});
            }else{
                res.status(200).send({category});
            }
        }
    });
}

function saveCategory(req, res){
    var category = new Category();

    var params = req.body;
    category.name = params.name;
    category.description = params.description;
    category.date = new Date();
    category.file = 'null';

    category.save((err, categoryStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la Categoría'});
        }else{
            if(!categoryStored){
                res.status(404).send({message: 'La Categoría no ha sido guardada'});
            }else{
                res.status(200).send({category: categoryStored});
            }
        }
    });

}
function getCategories(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 15;

    Category.find().sort('name').paginate(page, itemsPerPage, function(err, categories, total){
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!categories){
                res.status(404).send({message: 'No hay categorías'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    categories: categories
                });
            }
        }
    });
}
function updateCategory(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(categoryId, update, (err, categoryUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el Ramo'});
        }else{
            if(!categoryUpdated){
                res.status(500).send({message: 'Error al actualizar el Ramo'});
            }else{
                res.status(200).send({category: categoryUpdated});
            }
        }
    });
}    
function deleteCategory(req, res){
    var categoryId = req.params.id;

    Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar Categoría'});
        }else{
            if(!categoryRemoved){
                res.status(404).send({message: 'Categoría no ha sido eliminada'});
            }else{
                res.status(200).send({categoryRemoved});
            }
        }
    });    

  }

module.exports = {
    getCategory,
    getCategories,
    saveCategory,
    updateCategory,
    deleteCategory

}