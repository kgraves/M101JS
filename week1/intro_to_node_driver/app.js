var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/local', function(err, db) {

  assert.equal(null, err);
  console.log('Successfully connect to server');

  db.collection('movies').find({}).toArray(function(err, docs) {
    docs.forEach(function(doc) {
      console.log(doc.title);
    });
  });

  db.close();
});
