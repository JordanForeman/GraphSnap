/* Lib & Config */
var config = require('./config')(),
	path = require('path'),
	express = require('express'),
	exphbs = require('express3-handlebars'),
	app = express(),
	attachDB = null,
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

/* Models */
var User = require('./models/Users');

/* Passport Configuration */
passport.use(User.createStrategy({ usernameField: 'email' }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* App Settings */
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({cookie: { 
  expires: new Date(Date.now() + 60 * 10000), 
  maxAge: 60*10000
}}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	if (req.user){
		res.locals.user = req.user;

		//TODO: get all notifications for user
	}
	next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* Controllers */
require('./controllers/Auth')(app);
require('./controllers/Users')(app);
require('./controllers/Product')(app);
require('./controllers/ProductType')(app);

/* API */
require('./api/api')(app);
require('./api/ProductType')(app);

/* Connect */
var host = "mongodb://" + config.host + ":" + config.dbPort + "/" + config.dbName;
var db = mongoose.connection;
db.on('error', function(){
	//TODO: error
	console.log("Error connecting to MongoDB server. Is mongod running?");
});

db.on('open', function(){

	attachDB = function(req, res, next) {
		req.db = db;
		next();
	};

	app.all('/admin*', attachDB, function(req, res, next){
		Admin.run(req, res, next);
	});

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/', function(req, res){
		//TODO: redirect to dashboard if authenticated
		if (req.user)
			console.log("logged in");
		else
			console.log("not logged in");

		res.render('home', { user: req.user });
	});

	app.listen(config.port);
});

mongoose.connect(host);
