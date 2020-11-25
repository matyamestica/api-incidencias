'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');


var Answer = require('../models/answer');
var Problem = require('../models/problem');
var Subcategory = require('../models/subcategory');
var Subject = require('../models/subject');
var User = require('../models/user');
const { checkServerIdentity } = require('tls');


function getProblem(req, res){
    var problemId = req.params.id;

    Problem.findById(problemId)
    .populate({
        path: 'user_create'
    }).populate({
        path: 'category'
    }).populate({
        path: 'subcategory'
    }).populate({
        path: 'subject'
    }).populate({
        path: 'answers',
        populate: { path: 'user' }
    }).exec((err, problem) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!problem){
                res.status(404).send({message: 'El problema no existe'});
            }else{
                res.status(200).send({problem});
            }
        }
    });
}

function saveProblem(req, res){
    var problem = new Problem();

    var params = req.body;

    console.log(params);

    var hourFin = new Date();
    hourFin = moment().add(1, 'hours');

    problem.code = params.code;
    problem.user_create = params.user_create;
    problem.description = params.description;
    problem.users = params.users;
    problem.file = 'null'; //MODIFICAR PARA PODER SUBIR ARCHIVO
    problem.subject = params.subject;
    problem.category = params.category;
    problem.subcategory = params.subcategory;
    problem.state = 'active';
    problem.date_create = new Date();//MODIFICAR PARA OBTENER FECHA DE CREACIÓN
    problem.date_fin = hourFin;//MODIFICAR PARA OBTENER FECHA DE CIERRE

    problem.save((err, problemStored) => {
        if(err){
            res.status(500).send({message:'Error al ingresar problema'});
        }else{
            if(!problemStored){
                res.status(404).send({message:'El error no ha sido ingresado'});
            }else{
                res.status(200).send({problem: problemStored});
            }
        }
    });
}

function getProblems(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 15;

    Problem.find().populate({path: 'user_create'}).populate({path: 'category'}).populate({path: 'subcategory'}).populate({path: 'subject'}).populate({path: 'answers', populate: {path: 'user'}}).sort('name').paginate(page, itemsPerPage, function(err, problems, total){
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!problems){
                res.status(404).send({message: 'No hay ramos'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    problems: problems
                });
            }
        }
    });

}

function updateProblem(req, res){
    var problemId = req.params.id;
    var update = req.body;

    Problem.findByIdAndUpdate(problemId, update, (err, problemUpdated) => {   
        if(err){
            res.status(500).send({message: 'Error al guardar el Problema'});
        }else{
            if(!problemUpdated){
                res.status(500).send({message: 'Error al actualizar el Problema'});
            }else{
                res.status(200).send({problem: problemUpdated});
            }
        }
    });
}

function getProblemByUser(req, res) {
var userId = req.params.userId;
var aux = req.body;

Problem.find({user_create: userId}).populate({path: 'user_create'}).populate({path: 'category'}).populate({path: 'subcategory'}).populate({path: 'subject'}).populate({path: 'answers', populate: {path: 'user'}}).sort('name').exec((err, problem) => {
    if(err){
        res.status(500).send({message: 'Error en la petición'});
    }else{
        if(!problem){
            res.status(404).send({message: 'El problema no existe'});
        }else{
            res.status(200).send({problem});
        }
    }
});

}

function closeProblem(req, res){
    var problemId = req.params.id;
    var update = 
    {
        state: -1,

    };

    Problem.findByIdAndUpdate(problemId, update, (err, problemUpdated) => {   
        if(err){
            res.status(500).send({message: 'Error al actualizar el Problema'});
        }else{
            if(!problemUpdated){
                res.status(500).send({message: 'Error al actualizar el Problema'});
            }else{
                res.status(200).send({problem: problemUpdated});
            }
        }
    });
}

function deleteProblem(req, res){
    var problemId = req.params.id;

    Problem.findByIdAndRemove(problemId, (err, problemRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar la incidencia'});
        }else{
            if(!problemRemoved){
                res.status(404).send({message: 'La incidencia no ha sido eliminada'});
            }else{
                res.status(200).send({problemRemoved});
            }
        }
    });
}

async function dataProblems(req, res){

  const active = await Problem.countDocuments({
        state: 'active'
    });
    console.log(active);

   const closed = await Problem.countDocuments({
        state: "-1"
   });
   console.log(closed);

   
   const answer_admin = await Answer.countDocuments({
       user: "5edf0cfbef561a1ffc487705"
   });
   console.log(answer_admin);

   const answer_secretary = await Answer.countDocuments({
        user: "5fb261322c19c93fa46fdc94"
   });

   let response = { 
       activos: active,
       cerrados: closed,
       director: answer_admin,
       secretaria: answer_secretary
   }
   console.log(answer_secretary);
   console.log(response);

   res.status(200).send({response});

    
}

module.exports = {
    getProblem,
    getProblems,
    saveProblem,
    updateProblem,
    getProblemByUser,
    closeProblem,
    deleteProblem,
    dataProblems
}