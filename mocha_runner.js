var glob = require('glob');
var spawn = require('child_process').spawn;
var Server = require('./server');
var mockDB = require('./mockDB');

var db = new mockDB();
var port = process.env.PORT || 3000;

var server = new Server(db).init(port, function() {
  process.env.URL = 'http://localhost: ' + port;
  return glob('test', function(err, filename) {
    var child = spawn('mocha', ['--recursive'].concat(filename));
    child.stdout.on('data', function(msg) {
      db.emptyCart();
      return process.stdout.write(msg);
    });
    child.stderr.on('data', function(msg) {
      return process.stderr.write(msg);
    });
    return child.on('exit', function(code) {
      return process.exit(code);
    });
  });
});


