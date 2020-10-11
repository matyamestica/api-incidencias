'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

var nodemailer = require('nodemailer');
const { db } = require('./models/user');
app.post('/send-email', (req, res) => {
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
        to: 'maty6289@live.cl',
        subject: 'Enviado desde nodemailer',
        text: 'Funciona el envío de correos'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            res.status(500).send(error.message);
        }else{
            console.log('Email enviado');
            res.status(200).jsonp(req.body);
        }
    });   
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/incidencias', {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La base de datos esta corriendo correctamente...");
        app.listen(port, function(){
            console.log("Servidor del api rest escuchando en el puerto http:localhost:"+port);
        });
    }
});

