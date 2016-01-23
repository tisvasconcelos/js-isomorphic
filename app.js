// server.js
// load the things we need
var express = require('express'),
    app = express(),
    i18n = require('i18n-2'),
    helpers = require('express-helpers'),
    bodyParser = require('body-parser');

// i18n configure
i18n.expressBind(app, {
    locales:['pt'],
    extension: '.json',
    directory: __dirname + '/locales'
});

// express configure
(function(){
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/views'));
  app.use(bodyParser.json());
  helpers(app);
})();

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
          message: 'Ola comprador',
          usersInConversation: Math.floor((Math.random() * 10) + 1)
        },
        {
          name: 'Francesquini',
          message: 'Tudo bem',
          usersInConversation: Math.floor((Math.random() * 10) + 1)
        },
        {
          name: 'Martell',
          message: 'Tudo e vc?',
          usersInConversation: Math.floor((Math.random() * 10) + 1)
        }
      ]
    };
    res.render('conversation/conversation', messages);
});

//Esse seria o get original que o marketplace chamaria para criar a página pela primeira vez
app.post('/conversation', function(req, res) {
    res.render('conversation/conversation', req.body);
});

app.get('/i18n/*', function(req, res) {
  var i18n = new (require('i18n-2'))({
    locales:['pt'],
    extension: '.json',
    directory: __dirname + '/locales'
  });
  var message = i18n.__(req.params[0].toString()),
      messageSplit = message.split(" "),
      count = 0,
      newMessage = "";

  messageSplit.forEach(function(item){
    if(item.indexOf("%s") != -1) {
      newMessage += item.replace("%s", "{"+count+"}") + " ";
      count++;
    } else {
      newMessage += item + " ";
    }
  });
  res.json({
    'key': req.params[0],
    'message': newMessage.trim(),
    'version': Math.floor(Date.now() / 1000)
  });
});

app.listen(3000);
