var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './views', '/index.html'));
});

if(!module.parent) {
  server.listen(port, function() {
    console.log("Listening on " + port);
  });
}