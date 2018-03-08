var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server)
global.io = io;

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/MessagingExampleApp');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors({ origin: '*' }));

app.use(cors());

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

const userRoute = require('./routes/user');
const conversationRoute = require('./routes/conversation');

app.use('/api', userRoute);
app.use('/api', conversationRoute);
