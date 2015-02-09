var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mockDB = require('./mockDB');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var db = new mockDB();

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

io.on('connection', function(socket) {
  // console.log('A new client connected: ' + socket.id)
});

function Server(dBase) {
  this.db = dBase;
}

Server.prototype.init = function(port, cBack) {
  _this = this;
  require('./lib/routes')(app, _this.db, io);
  server.listen(port, cBack);
};

if(!module.parent) {
  new Server(db).init(port, function() {
    console.log("Listening on " + port);
  });
}

module.exports = Server;