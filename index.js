var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var db = require('./models');
var session = require('express-session');
var bcrypt = require('bcrypt')
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));

//configuring session middleware
app.use(session({
    //unique string to assign a cookie specific to your app, generally an environment, can be any string
    secret: 'I watch way too many worldstar hiphop videos',
    //forces the saving of a session, even if nothing has changed.
    resave: false,
    //stores the session, even if we haven't assigned anything to the session
    saveUninitialized: true
}));
//creating custom middleware
//inbetween the req and res, do this before moving on,something that you want to do over and over again.
app.use(function(req, res, next) {
    req.getParamNames = function() {
        //Uppercase object references the "big daddy object" that everything else borrows from
        //basically this will return whatever params that we pass into urls and put it into the object
        return Object.keys(req.params);
    }
    next();
});

app.get('/', function(req, res) {
    //stores in session, the last place the user was
    req.session.lastPage = '/';
    bcrypt.hash('password', 10, function(err, hash) {
        console.log('my hash:', hash);
    });
    res.render('index');
});

//new route we created
app.get('/sum/:x/:y', function(req, res) {
    res.send(req.getParamNames());
});

app.use('/tacos', require('./controllers/tacos'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;