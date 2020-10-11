'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Subject = require('../models/subject');
var User = require('../models/user');

function getSubject(req, res){
    var subjectId = req.params.id;

    Subject.findById(subjectId, (err, subject) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!subject){
                res.status(404).send({message: 'El Ramo no existe'});
            }else{
                res.status(200).send({subject});
            }
        }
    });
}

function getSubjects(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 5;

    Subject.find().sort('name').paginate(page, itemsPerPage, function(err, subjects, total){
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!subjects){
                res.status(404).send({message: 'No hay ramos'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    subjects: subjects
                });
            }
        }
    });

}

function saveSubject(req, res){
    var subject = new Subject();

    var params = req.body;
    subject.name = params.name;
    subject.code = params.code;
    subject.teacher = params.teacher;
    subject.file = params.file;

    subject.save((err, subjectStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el ramo'});
        }else{
            if(!subjectStored){
                res.status(404).send({message: 'El ramo no ha sido guardado'});
            }else{
                res.status(200).send({subject: subjectStored});
            }
        }
    });

}

function updateSubject(req, res){
    var subjectId = req.params.id;
    var update = req.body;

    Subject.findByIdAndUpdate(subjectId, update, (err, subjectUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el Ramo'});
        }else{
            if(!subjectUpdated){
                res.status(500).send({message: 'Error al actualizar el Ramo'});
            }else{
                res.status(200).send({subject: subjectUpdated});
            }
        }
    });
}

function deleteSubject(req, res){
    var subjectId = req.params.id;

    Subject.findByIdAndRemove(subjectId, (err, subjectRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el Ramo'});
        }else{
            if(!subjectRemoved){
                res.status(404).send({message: 'El Ramo no ha sido eliminado'});
            }else{
                res.status(200).send({subjectRemoved});
            }
        }
    });
}

module.exports = {
    getSubject,
    getSubjects,
    saveSubject,
    updateSubject,
    deleteSubject
}