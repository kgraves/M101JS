var assert = require('assert');
var express = require('express');
var engines = require('consolidate');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/local', function(err, db) {

  assert.equal(null, err);
  console.log('Successfully connect to server');

  app.get('/', function(req, res, next) {
    db.collection('movies').find({}).toArray(function(err, docs) {
      res.render('movies', { movies: docs });
    });
  });

  app.use(function(req, res) {
    res.sendStatus(404);
  });

  var server = app.listen(3030, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
  });

  // db.close();
});
