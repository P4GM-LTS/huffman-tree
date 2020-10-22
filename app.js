var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs =  require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*setInterval(()=>{
    fs.readdir('./public/uploads', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join('./public/uploads', file), err => {
                if (err) throw err;
            });
        }
    });
    console.log('./public/uploads is cleared');
}, 10000);*/

module.exports = app;
