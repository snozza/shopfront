var path = require('path');

function routes(app, db, io) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', '/index.html'));
  });

  app.get('/items', function(req, res) {
    res.send({items: db.allItems(), cart: db.cartSize()});
  });

  app.get('/filter', function(req, res) {
    var category = req.query.category;
    res.send({items: db.filteredItems(category), cart: db.cartSize()});
  });

  app.get('/showcart', function(req, res) {
    res.send(db.showCart());
  });

  app.post('/items', function(req, res) {
    var item = db.takeItem(req.body.id);
    io.sockets.emit('update-stock', item)
    res.status(200).send({item: item, cart: db.cartSize()});
  });

  app.delete('/items', function(req, res) {
    db.returnItem(req.body.id)
    res.sendStatus(200);
  });

  app.post('/vouchers', function(req, res) {
    var status = db.applyVoucher(req.body.code);
    if(status) return res.status(200).send({message: "Voucher applied"})
    else return res.status(403).send({message: ["Invalid voucher"]});
  });

  app.delete('/vouchers', function(req, res) {
    res.sendStatus(db.removeVoucher(req.body.id))
  });
}

module.exports = routes;