
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/ok'  method='post' name='form1'>";
  html += "</p>Nome: <input type= 'text' name='name'>";
  html += "</p>Email: <input type='text' name='email'>";
  html += "</p>Endereço: <input type='text' name='address'>";
  html += "</p>Telefone: <input type='text' name='mobilno'>\n";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

app.post('/ok', urlencodedParser, function (req, res){
  var reply='';
  reply += "Nome: " + req.body.name;
  reply += "E-mail: " + req.body.email; 
  reply += "Endereço: " + req.body.address;
  reply += "Telefone: " + req.body.mobilno;
  res.send(reply);
 });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
