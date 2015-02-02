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


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './views', '/index.html'));
});

app.get('/items', function(req, res) {
  res.send(db.allItems());
});

app.get('/showcart', function(req, res) {
  res.send(db.showCart());
});

app.post('/addcart', function(req, res) {
  res.send(db.takeItem(req.body.id));
});

if(!module.parent) {
  server.listen(port, function() {
    console.log("Listening on " + port);
  });
}

module.exports = server;