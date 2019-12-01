var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var winston = require('./logger');
require('./database/db');

const port = 3000;


var app = express();

app.use(logger('combined'));
app.use(cors());
app.use('/', indexRouter);
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    winston.info('Connected on port: ' + port);
})

module.exports = app;
