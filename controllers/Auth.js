var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	config = require('../config')(),
	jwt = require('jwt-simple'),
	Company = require("../models/Company"),
	User = require("../models/Users"),
	Emailer = require("../helpers/Emailer");

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

	/* 
		Registers a new user
		- req.body.company (opt)
		- req.body.companyId (opt)
		- req.body.email
		- req.body.name
		- req.body.password (optional)
	*/
	app.post('/register', function(req, res){

		var companyId = req.body.companyId || null,
			company = null,
			loginAfter = true; 

		console.log(companyId);

		if (companyId == null) {
			company = new Company(req.body.company);
			company.tier = 'basic';
			companyId = company.id;
		} else {
			loginAfter = false;
		}

		var key = "";
		while (key.length < 40)
			key += Math.random().toString(16).substring(2);
		key = key.substring(0, 40);

		var password = req.body.password || 'abcd1234'; //TODO: actually generate a password
		console.log(company);
		User.register(new User({ email: req.body.email, company: companyId, name: req.body.name, apiKey: key }), password, function(err, account){
			if (err) {
				console.log('error registering');
				console.log(err);
				return res.render('register', {account: account});
			}

			if (company) {
				company.users.push(account);
				company.save();
			} else {
				Company.findById(companyId, function(err, company){
					if (err) return console.log(err);
					company.users.push(account);
					company.save();
				});
			}

			if (loginAfter)
				req.login(account);

			var email = new Emailer(
				account.email,
				"Welcome to GraphSnap!",
				"<h2>Welcome to GraphSnap!<h2>" +
				"<p>You can login here. Your temporary password is: " + password + ". Please update your password from your account settings once you've logged in.</p>" +
				"<p>~ The GraphSnap Team</p>"
			);
			email.send(function(error, success){
				if(error) {
					console.error("Unable to send via postmark: " + error.message);
					return;
				}

				console.info("Sent to postmark for delivery")
			});

			account.save();
			res.redirect('/');
		});

	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};
