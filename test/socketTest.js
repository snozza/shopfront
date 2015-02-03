var expect = require('chai').expect;
var io = require('socket.io-client');
var request = require('request');

describe('#Sockets', function() {

  var options = {
    'transports' : ['websocket'],
    'forceNew' : true
  };

  var socket;

  beforeEach(function(done) {
    socket = io.connect('http://localhost:3000', options);
    done();
  });

  it('should emit new stock when item is added to cart', function(done) {
    socket.on('update-stock', function(data) {
      console.log(data)
      expect(data.stock).to.eql(3);
      socket.disconnect();
      done();
    });
    request('http://localhost:3000/items', function(err, res, body) {
      expect(JSON.parse(body)[0]['stock']).to.eql(4);
      request.post('http://localhost:3000/items').form({id: '1'});
    });   
  });
});

