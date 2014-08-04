var passport = require('passport'),
	mongoose = require('mongoose');

var Test = require("../Test"),
	User = require("../User"),
	Profile = require("../Profile"),
	TestValue = require("../TestValue"),
	DataPoint = require("../DataPoint");

var router = require('express').Router();

var SetupUserMiddleware = require('../middleware/SetupUser');

//======================
// GET Handlers
//======================
var getDataPoints = function(req, res){
	if (!req.user)
		res.redirect('/login');

	Profile.find({})
	.populate('dataPoints')
	.exec(function(err, profiles){
		if (err) return console.log(err);

		res.render("DataPoint/index", {profiles: profiles});
	});
};

var getCreateNewDataPoint = function(req, res){
	if (!req.user)
		res.redirect('/login');

	Profile.find({}, function(err, profiles){
		if (err) console.log(err);

		res.render('DataPoint/create', {profiles: profiles});
	});
};

var getCreateNewDataPointForProfile = function(req, res){
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
};

var getDataPointById = function(req, res){
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
};

//======================
// POST Handlers
//======================
var postCreateNewDataPoint = function(req, res){
	if (!req.user)
		res.redirect('/login');

	var dp = new DataPoint(),
		profileId = req.body.profileId;

	Profile.findById(profileId)
	.exec(function(err, profile){

		// Create Test Values
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

		for(var i = 0; i < ids.length; i++)
		{
			var identifier = ids[i];
			dp.customIdentifiers[i] = req.body[identifier] || "";
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
};

//======================
// Register Handlers
//======================
router.get('/DataPoints', getDataPoints);
router.get('/DataPoint/CreateNew', getCreateNewDataPoint);
router.get('/DataPoint/CreateNew/:id', getCreateNewDataPointForProfile);
router.get('/DataPoint/:id', getDataPointById);
router.post('/DataPoint/CreateNew', postCreateNewDataPoint);

//======================
// Hook up Middleware
//======================
router.use(SetupUserMiddleware);

module.exports = router;
