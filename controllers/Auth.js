var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	config = require('../config')(),
	jwt = require('jwt-simple'),
	Company = require("../models/Company"),
	User = require("../models/Users");

module.exports = function (app) {

	app.get('/login', function(req, res){
		res.render('login', {layout: 'landing'});
	});

	app.post('/login', passport.authenticate('local'), function(req, res){
		if (req.user)
			req.user.token = jwt.encode({email: req.user.email}, app.locals.secret);

	    res.redirect('/');
	});

	app.get('/register', function(req, res){

		if (config.mode === 'production')
			return res.render('email-signup', { title: 'Subscribe for Updates', layout: 'landing'});

		res.render('register', { title: 'Register', layout: 'landing' });
	});

	app.post('/register', function(req, res){
		var company = new Company({ name: req.body.company });
		company.save();

		var key = "";
		while (key.length < 40)
			key += Math.random().toString(16).substring(2);
		key = key.substring(0, 40);

		User.register(new User({ email: req.body.email, company: company, name: req.body.name, apiKey: key }), req.body.password, function(err, account){
			if (err) {
				console.log('error registering');
				console.log(err);
				return res.render('register', {account: account});
			}

	company.save();

			res.redirect('/');
		})
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};
