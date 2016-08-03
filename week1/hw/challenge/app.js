var assert = require('assert');
var bodyParser = require('body-parser');
var express = require('express');
var engines = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

MongoClient.connect('mongodb://localhost:27017/local', function(err, db) {

  assert.equal(null, err);
  console.log('Successfully connected to server');

  app.get('/', function(req, res, next) {
    res.render('add_movie', {});
  });

  app.post('/add_movie', function(req, res, next) {
    if (req.body.title == '' || req.body.year == '' || req.body.imdb == '') {
      next('Please provide an entry for all fields');
    } else {
      db.collection('movies').insertOne(req.body, function(err, r) {
        assert.equal(null, err);
        res.send('Docuemnt inserted with _id: ' + r.insertedId);
      });
    }
  });

	/**
   * Error handler
   */
  app.use(function(err, req, res, next) {
		console.error(err.message);
		console.error(err.stack);
		res.status(500).render('error', { error: err });
  });

  var server = app.listen(3030, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
  });

});
