var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	config = require('../config')(),
	User = require("../models/Users");

module.exports = function (app) {

	app.get('/login', function(req, res){
		res.render('login', {layout: 'landing'});
	});

	app.post('/login', passport.authenticate('local'), function(req, res){
	    res.redirect('/');
	});

	app.get('/register', function(req, res){

		if (config.mode === 'production')
			return res.render('email-signup', { title: 'Subscribe for Updates', layout: 'landing'});

		res.render('register', { title: 'Register', layout: 'landing' });
	});

	app.post('/register', function(req, res){
		User.register(new User({ email: req.body.email }), req.body.password, function(err, account){
			if (err) {
				console.log('error registering');
				console.log(err);
				return res.render('register', {account: account});
			}

			res.redirect('/');
		})
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};
