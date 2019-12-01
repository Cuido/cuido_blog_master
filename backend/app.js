var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var winston = require('./logger');
require('./database/db');
require('./services/passport');

const port = 3000;


var app = express();

app.use(logger('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieSession({
    name: 'session',
    keys: ['secret'],
    maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);
app.use('/', indexRouter);

app.listen(port, () => {
    winston.info('Connected on port: ' + port);
})

module.exports = app;
