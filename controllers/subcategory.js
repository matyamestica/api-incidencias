'use strict'

var path = require('path');
var fs = require('fs');

var Subcategory = require('../models/subcategory');
var Subject = require('../models/subject');
var User = require('../models/user');

function getSubcategory(req, res){
    var subcategoryId = req.params.id;

    Subcategory.findById(subcategoryId).populate({path: 'category'}).exec((err, subcategory) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!subcategory){
                res.status(404).send({message: 'La Subcategoría no existe'});
            }else{
                res.status(200).send({subcategory});
            }
        }
    });
}

function getSubcategories(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 15;

    Subcategory.find().populate({path: 'category'}).sort('name').paginate(page, itemsPerPage, function(err, subcategories, total){
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!subcategories){
                res.status(404).send({message: 'No hay ramos'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    subcategories: subcategories
                });
            }
        }
    });

}

function saveSubcategory(req, res){
    var subcategory = new Subcategory();

    var params = req.body;
    subcategory.name = params.name;
    subcategory.description = params.description;
    subcategory.category = params.category;
    subcategory.file = 'null';

    subcategory.save((err, subcategoryStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la subcategoría'});
        }else{
            if(!subcategoryStored){
                res.status(404).send({message: 'La subcategoría no ha sido guardada'});
            }else{
                res.status(200).send({subcategory: subcategoryStored});
            }
        }
    });

}

function updateSubcategory(req, res){
    var subcategoryId = req.params.id;
    var update = req.body;

    Subcategory.findByIdAndUpdate(subcategoryId, update, (err, subcategoryUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el Ramo'});
        }else{
            if(!subcategoryUpdated){
                res.status(500).send({message: 'Error al actualizar el Ramo'});
            }else{
                res.status(200).send({subcategory: subcategoryUpdated});
            }
        }
    });
}

function deleteSubcategory(req, res){
    var subcategoryId = req.params.id;

    Subcategory.findByIdAndRemove(subcategoryId, (err, subcategoryRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar Subcategoría'});
        }else{
            if(!subcategoryRemoved){
                res.status(404).send({message: 'Subcategoría no ha sido eliminada'});
            }else{
                res.status(200).send({subcategoryRemoved});
            }
        }
    });
}

module.exports = {
    getSubcategory,
    getSubcategories,
    updateSubcategory,
    saveSubcategory,
    deleteSubcategory
}