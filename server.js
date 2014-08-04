var config 				= require('./config')();

// BASE SETUP
// ===================================================================

// Packages
var express 			= require('express'),
	morgan 				= require('morgan'),
	cookieParser 		= require('cookie-parser'),
	bodyParser 			= require('body-parser'),
	methodOverride 		= require('method-override'),
	app 				= express(),
	passport 			= require('passport'),
	session 			= require('express-session'),
	handlebars 			= require('express3-handlebars'),
	server 				= require('http').Server(app);

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(morgan(process.env.NODE_ENV || 'development'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());

var PORT 				= process.env.PORT || 3000;

// Middleware
// ===================================================================
var custom_middleware = require('./components/middleware')(app);

// DBA SETUP
// ===================================================================
var DataBase 			= require('./Components/database/mongodb');
DataBase(app);

// Passport Setup
// ===================================================================
var config 				= require('./config')();
require('./config/passport')(passport);

app.use(session({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES / CONTROLLERS
// ===================================================================
var base 				= require('./Components'),
	AuthController		= require('./Components/controllers/AuthController'),
	ChartController		= require('./Components/controllers/ChartController'),
	CompanyController	= require('./Components/controllers/CompanyController'),
	DataPointController	= require('./Components/controllers/DataPointController'),
	ImportController	= require('./Components/controllers/ImportController'),
	MailHandler			= require('./Components/controllers/MailController'),
	ProfileController	= require('./Components/controllers/ProfileController'),
	ReportController	= require('./Components/controllers/ReportController'),
	TestController		= require('./Components/controllers/TestController'),
	UserController		= require('./Components/controllers/UserController');

// register routes
app.use('/', base);
app.use('/', AuthController);
app.use('/', ChartController);
app.use('/', CompanyController);
app.use('/', DataPointController);
app.use('/', ImportController);
app.use('/', MailHandler);
app.use('/', ProfileController);
app.use('/', ReportController);
app.use('/', TestController);
app.use('/', UserController);

// API
// ===================================================================
var TestValueAPI 		= require('./api/TestValue');

app.use('/api/', TestValueAPI);
