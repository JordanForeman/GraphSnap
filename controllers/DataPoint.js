var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	User = require("../models/Users"),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Profile = require("../models/Profile"),
	ObjectId = mongoose.Types.ObjectId,
	DataPoint = require("../models/DataPoint");

module.exports = function(app){

	app.get("/DataPoint/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Profile.find({}, function(err, profiles){
			if (err) console.log(err);

			res.render('DataPoint/create', {profiles: profiles});
		});
	});

	app.get("/DataPoint/CreateNew/:id", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Profile.findById(req.params.id, function(err, profile){
			if (err) return console.log(err);

			res.render('DataPoint/create', {profile: profile});
		});
	});

	app.post("/DataPoint/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		var dp = new DataPoint();

		Profile.findById(req.body.profileId)
		.exec(function(err, profile){

			var ids = profile.customIdentifiers,
				customIdentifiers = Array();

			for(var i = 0; i < ids.length; i++)
			{
				dp.customIdentifiers.push("");
			}

			dp.profile = profile;
			prod.company = new ObjectId(user.company);
			prod.save(function(err){
				if (err) return console.log(err);
			});

		});

		res.redirect("/DataPoints");
	});

	app.get("/DataPoints", function(req, res){
		if (!req.user)
			res.redirect('/login');

		//Get Profiles
		Profile.find({}, function(err, profiles){
			if (err) console.log(err);

			//Get DataPoints
			DataPoint.find({})
			.populate('profile')
			.exec(function(err, dps){
				if (err) console.log(err);

				res.render("DataPoint/index", {
					profiles: profiles,
					dataPoints: dps
				});
			})
		});
	});

	app.get("/DataPoint/:id", function(req, res){
		if (!req.user)
			res.redirect('/login');

		DataPoint.findById(req.params.id, function(err, dp){
			if (err){
				console.log(err);
				res.redirect("/DataPoints");
			} else {
				res.render("DataPoint/single", {dataPoint: dp});
			}
		});
	});

};
