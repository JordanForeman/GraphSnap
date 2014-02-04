var mongoose = require('mongoose'),
	passport = require('passport'),
	User = require("../models/Users");

// TODO:
module.exports = function(app){

	app.get('/users', 
			function(req, res){
				if (!req.user)
					res.redirect('/login');

				User.find({}, function(err, users){
					if (err) {
						console.log(err);
						res.redirect('/');
					} else {
						res.render('users/index', {users: users});
					}
			});
	});

	app.get('/users/:id', function(req, res){
		if (!req.user)
			res.redirect('/login');

		console.log(req.params.id);

		User.findById(req.params.id, function(err, u){
			if (err) {
				console.log(err);
			} else if (!u) {
				console.log('no user with that id');
			} else {
				res.render('users/single', {usr : u});
				return;
			}
		 	
		 	res.redirect('/');
		});
	});

	app.get('/settings', function(req, res){
		if (!req.user){
			console.log("not authorized");
			res.redirect("/");
		}

		res.render('users/settings');
	});

	app.post('/settings', function(req, res){
		if (!req.user)
			res.redirect('/login');
		User.update({_id : req.body.uid}, 
					{
						name: req.body.name,
						email: req.body.email
					}, function(err, numAffected, rawResp){
						if (err) console.log(err);
					});
		res.redirect('/');
	});

};
