var express = require('express');
var app = express();

// view engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// middleware
app.use(express.static(__dirname + '/public'));

// define routes
var index = require(__dirname + '/routes/index');
var line_tip = require(__dirname + '/routes/linetip');

// routen middleware
app.use('/', index);
app.use('/linetip', line_tip);

app.listen(1338);