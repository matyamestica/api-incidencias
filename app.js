'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var subject_routes = require('./routes/subject');
var subcategory_routes = require('./routes/subcategory');
var problem_routes = require('./routes/problem');
var category_routes = require('./routes/category');
var answer_routes = require('./routes/answer');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow','GET, POST, PUT, OPTIONS, DELETE');

    next();
});


//Rutas base
app.use('/api', user_routes);
app.use('/api', subject_routes);
app.use('/api', subcategory_routes);
app.use('/api', problem_routes);
app.use('/api', category_routes);
app.use('/api', answer_routes);
module.exports = app;
