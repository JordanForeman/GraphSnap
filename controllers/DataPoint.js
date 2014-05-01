var BaseController = require("./Base"),
	View = require("../views/Base"),
	Test = require("../models/Test"),
	passport = require('passport'),
	User = require("../models/Users"),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Profile = require("../models/Profile"),
	ObjectId = mongoose.Types.ObjectId,
	TestValue = require("../models/TestValue"),
	DataPoint = require("../models/DataPoint");

module.exports = function(app){

	app.get("/DataPoints", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Profile.find({})
		.populate('dataPoints')
		.exec(function(err, profiles){
			if (err) return console.log(err);

			res.render("DataPoint/index", {profiles: profiles});
		});
	});

	app.get("/DataPoint/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Profile.find({}, function(err, profiles){
			if (err) console.log(err);

			res.render('DataPoint/create', {profiles: profiles});
		});
	});

	//Generate view with a predetermined profile
	app.get("/DataPoint/CreateNew/:id", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Profile.findById(req.params.id)
		.exec(function(err, profile){
			if (err) return console.log(err);

			Test.find({profile: profile._id}, function(err, tests){
				if (err) return console.log(err);

				profile.tests = tests;
				res.render('DataPoint/create', {profile: profile});
			});
		});
	});

	app.post("/DataPoint/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		var dp = new DataPoint(),
			profileId = req.body.profileId;

		Profile.findById(profileId)
		.exec(function(err, profile){

			Test.find({profile: profileId}, function(err, tests){
				if (err) return console.log(err);

				for (var i = 0; i < tests.length; i++) {
					var test = tests[i],
						testId = test._id;

					var testValue = new TestValue(),
						value = req.body[testId];

					console.log(test.name + ": " + value);

					testValue.test = test;

					if (test.isQualitative) {
						testValue.qualValue = value || false;
					}

					if (test.isQuantitative) {
						testValue.quantValue = value;
					}

					testValue.datapoint = dp;
					testValue.save();
					console.log(testValue);
					
					dp.testValues.push(testValue);
					dp.save();
				}
			});








			var ids = profile.customIdentifiers;
			dp.customIdentifiers = [dp._id];

			for(var i = 1; i < ids.length; i++)
			{
				dp.customIdentifiers.push("");
			}

			dp.profile = profile;
			dp.value = req.body.value;
			dp.company = req.user.company;
			dp.save(function(err){
				if (err) return console.log(err);
			});

			profile.dataPoints.push(dp);
			profile.save();

		});

		res.redirect("/DataPoints");
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
