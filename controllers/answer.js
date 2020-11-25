'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');


var Answer = require('../models/answer');
var Category = require('../models/category');
var Problem = require('../models/problem');
var Subcategory = require('../models/subcategory');
var Subject = require('../models/subject');
var User = require('../models/user');
const answer = require('../models/answer');
var nodemailer = require('nodemailer');
const user = require('../models/user');

function getAnswers(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 15;

    Answer.find().sort('name').paginate(page, itemsPerPage, function(err, answers, total){
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!answers){
                res.status(404).send({message: 'No hay categorías'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    answers: answers
                });
            }
        }
    });
}    

function saveAnswer(req, res){
    var answer = new Answer();

    var params = req.body;
    answer.problem = params.problem;
    answer.user = params.user;
    answer.message = params.message;
    answer.date = new Date();
    answer.file = params.file;
    answer.type = params.type;
   

    answer.save((err, answerStored) => {

        Problem.findByIdAndUpdate(
            params.problem,
            { $push: { users: params.user } },
            function(err, response){
                if(err){
                    return err;
                }
                else{
                return response;
                }
            }  
        );


        if(err){
            res.status(500).send({message: 'Error al guardar la respuesta'});
        }else{
            if(!answerStored){
                res.status(404).send({message: 'La respuesta no ha sido guardado'});
            }else{
                res.status(200).send({answer: answerStored});
                
                Problem.findByIdAndUpdate(
                    params.problem,
                    { $push: { answers: answerStored._id } },
                    function(err, response){
                        if(err){
                            return err;
                        }
                        else{
                        return response;
                        }
                    }  
                );
            }
        }
    });

}

function sendEmail(req, res){
 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'incidencias.ucatolicadelmaule@gmail.com',
        pass: 'incidenciasucm',
    },
});
    var mailOptions = {
        from: 'incidencias.ucatolicadelmaule@gmail.com',
        to: 'maty6289@live.cl,marco.cgonzalez19@gmail.com',
        subject: 'Enviado desde nodemailer',
        text: 'Se ha registrado una nueva respuesta a su incidencia,visite el portal para más información.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            res.status(500).send(error.message);
        }else{
            console.log('Email enviado');
            res.status(200).jsonp(req.body);
        }
    });   

    
}

function updateAnswer(req, res){
    var answerId = req.params.id;
    var update = req.body;

    Answer.findByIdAndUpdate(answerId, update, (err, answerUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la Respuesta'});
        }else{
            if(!answerUpdated){
                res.status(500).send({message: 'Error al actualizar la Respuesta'});
            }else{
                res.status(200).send({answer: answerUpdated});
            }
        }
    });
}    

module.exports = {
    getAnswers,
    saveAnswer,
    sendEmail,
    updateAnswer
}