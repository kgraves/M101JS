var express = require('express');
var app = express();
var engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next) {
  res.render('hello', { name: 'Templates' });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

var server = app.listen(3030, function() {
  var port = server.address().port;
  console.log('Express server listening on port %s', port);
});
