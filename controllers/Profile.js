var mongoose = require('mongoose'),
	DataPoint = require("../models/DataPoint"),
	Profile = require("../models/Profile");

module.exports = function(app){

	app.get('/Profiles', function(req, res){
		if(!req.user)
			res.redirect('/');

		Profile.find({company: req.user.company}, function(err, profiles){
			if (err){
				console.log(err);
				res.redirect('/');
			}

			res.render('Profile/index', {profiles: profiles});
		});
	});

	app.get('/Profile/CreateNew', function(req, res){
		if (!req.user)
			res.redirect('/login');


		res.render('Profile/create');
	});

	app.post('/Profile/CreateNew', function(req, res){
		if (!req.user)
			res.redirect('/login');

		var profile = new Profile;
		profile.name = req.body.profileName;
		console.log(req.user.company);
		profile.customIdentifiers.push("ID");
		profile.company = req.user.company;
		profile.save(function(err){
			if (err) console.log(err);
		});
		res.redirect("/DataPoints");
	});

	app.get('/Profile/:id', function(req, res){
		if (!req.user)
			res.redirect('/');

		Profile.findById(req.params.id)
		.populate('dataPoints')
		.exec(function(err, profile){
			if (err){
				console.log(err);
				res.redirect("/Profiles");
			} else {
				res.render("Profile/single", {profile: profile});
			}
		});
	});

	app.get('/Profile/AddIdentifier/:id', function(req, res){
		if (!req.user)
			res.redirect('/');

		Profile.findById(req.params.id, function(err, profile){
			if (err){
				console.log(err);
				return res.redirect("/Profiles");
			}

			res.render("Profile/AddIdentifier", {profile : profile})
		});
	});

	app.post('/Profile/AddIdentifier', function(req, res){

		Profile.findById(req.body.profileId, function(err, profile){

			profile.customIdentifiers.push(req.body.name);
			profile.save();

			DataPoint.find({profile : profile})
			.exec(function(err, dataPoints){

				for (var i = 0; i < dataPoints.length; i++)
				{
					dataPoints[i].customIdentifiers.push(null);
					dataPoints[i].save();
				}

			});
		});

		res.redirect("/DataPoints");
	})

};
