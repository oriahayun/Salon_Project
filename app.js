var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var colors = require('colors');
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

// Connect Database
connectDB();

var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
        //console.log('cookie created successfully');
    } else {
        // yes, cookie was already present 
        //console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
