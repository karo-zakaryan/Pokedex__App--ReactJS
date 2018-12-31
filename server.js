let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let indexRoutes = require('./routes/index');
let Users = require('./routes/Users');

let corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/users', Users);

module.exports = app;