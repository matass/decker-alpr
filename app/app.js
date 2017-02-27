var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

var index = require('./routes/index');
app.use('/', index);

var plates = require('./routes/plates');
app.use(plates);

var upload = require('./routes/upload');
app.use(upload);

app.use(express.static(path.join(__dirname, '/public/images')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var server = app.listen(3000);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
