var config = require('../../config')(),
	mongoose = require('mongoose');

var mongodb = function(app) {

	/* Connect */
	var host = config.dbHost 
			|| ("mongodb://" + config.host + ":" + config.dbPort + "/" + config.dbName),
		db = mongoose.connection;

	db.on('error', function(){
		//TODO: error
		console.log("Error connecting to MongoDB server. Is mongod running at " + host + "?");
	});

	db.on('open', function(){

		attachDB = function(req, res, next) {
			req.db = db;
			next();
		};

		app.all('/admin*', attachDB, function(req, res, next){
			Admin.run(req, res, next);
		});

		app.get('/attribution', function(req, res){
			res.render('attribution');
		});

		app.get('/Subscribe', function(req, res){
			res.render('email-signup', {title: "Subscribe for Updates", layout: 'landing'});
		});

		app.get('/prototype', function(req, res){
			res.render('prototype');
		});

		app.get('/', function(req, res){
			res.locals.useCharts = true;

			if (req.user)
			{
				DataPoint.find({company: req.user.company}, function(err, dps){
					if (err) console.log(err);

					res.render('dashboard', { user: req.user});
				});
			}
			else
				res.render('index', {layout: 'landing'});
		});

		app.listen(config.port);
	});

	mongoose.connect(host);

};

module.exports = mongodb;
