// server.js
// load the things we need
var express = require('express');
var app = express();
var helpers = require('express-helpers');
var bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
helpers(app);

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('template/template', {title: "Ola servidor!"});
});

app.post('/post', function(req, res) {
    res.render('template/template', req.body);
});

app.get('/conversation', function(req, res) {
    var messages = {
      messages : [
        {
          name: 'Francesquini',
          message: 'Ola comprador'
        },
        {
          name: 'Francesquini',
          message: 'Tudo bem'
        },
        {
          name: 'Martell',
          message: 'Tudo e vc?'
        }
      ]
    };
    res.render('conversation/conversation', messages);
});

//Esse seria o get original que o marketplace chamaria para criar a página pela primeira vez
app.post('/conversation', function(req, res) {
    res.render('conversation/conversation', req.body);
});

app.listen(3000);
