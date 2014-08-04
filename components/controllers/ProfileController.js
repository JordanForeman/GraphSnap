var mongoose = require('mongoose');

var	DataPoint = require("../DataPoint"),
	Profile = require("../Profile");

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getProfiles = function(req, res){
	if(!req.user)
		res.redirect('/');

	Profile.find({company: req.user.company}, function(err, profiles){
		if (err){
			console.log(err);
			res.redirect('/');
		}

		res.render('Profile/index', {profiles: profiles});
	});
};

var getCreateNewProfile = function(req, res){
	if (!req.user)
		res.redirect('/login');

	res.render('Profile/create');
};

var getProfileById = function(req, res){
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
};

var getAddIdentifierToProfile = function(req, res){
	if (!req.user)
		res.redirect('/');

	Profile.findById(req.params.id, function(err, profile){
		if (err){
			console.log(err);
			return res.redirect("/Profiles");
		}

		res.render("Profile/AddIdentifier", {profile : profile})
	});
};

//======================
// POST Handlers
//======================
var postCreateNewProfile = function(req, res){
	if (!req.user)
		res.redirect('/login');

	var profile = new Profile;
	profile.name = req.body.profileName;
	console.log(req.user.company);
	profile.company = req.user.company;
	profile.save(function(err){
		if (err) console.log(err);
	});
	res.redirect("/DataPoints");
};

var postAddIdentifierToProfile = function(req, res){

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
};

//======================
// Register Handlers
//======================
router.get('/Profiles', getProfiles);
router.get('/Profile/CreateNew', getCreateNewProfile);
router.get('/Profile/:id', getProfileById);
router.get('/Profile/AddIdentifier/:id', getAddIdentifierToProfile)
router.post('/Profile/CreateNew', postCreateNewProfile);
router.post('/Profile/AddIdentifier', postAddIdentifierToProfile);

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('../middleware/SetupUser');
router.use(SetupUserMiddleware);

module.exports = router;
