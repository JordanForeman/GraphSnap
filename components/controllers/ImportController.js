var mongoose 	= require('mongoose'),
	fs 			= require('fs');

var	Profile 	= require('../Profile'),
	DataPoint	= require('../DataPoint');

var router		= require('express').Router();

//======================
// GET Handlers
//======================
var getImport = function(req, res){
	// if (!req.user)
	// 	res.redirect('/login');

	res.render('Import/index');
};

//======================
// POST Handlers
//======================
var postImportSpec = function(req, res){

	if (!req.user)
		return res.status(300);

	var profileName = req.body.name,
		company = req.user.company,
		spec = req.body.spec;

	if (!profileName){
		console.log('Request not properly formatted: no profileName');
		return res.status(500);
	}
	if(!company) {
		console.log('Request not properly formatted: no company');
		return res.status(500);
	}
	if(!spec) {
		console.log('Request not properly formatted: no spec');
		return res.status(500);
	}

	// Create a new profile based on the spec
	var profile = new Profile;
	profile.name = profileName;
	profile.company = company;

	for (var i = 0, len = spec.length; i < len; i++) {
		profile.customIdentifiers.push(spec[i]);
	}

	profile.save(function(err) {
		if (err) console.log(err);
	});

	// Return a JSON object with the new profile's data
	res.json(profile);

};

var postImportDataPoint = function(req, res){
	if (!req.user)
		return res.status(300);

	var profileId = req.body.pid,
		company = req.user.company,
		ids = req.body.ids;

	if (!profileId){
		console.log('Request not properly formatted: no profileId');
		return res.status(500);
	}
	if(!company) {
		console.log('Request not properly formatted: no company');
		return res.status(500);
	}
	if(!ids) {
		console.log('Request not properly formatted: no ids');
		return res.status(500);
	}

	var datapoint = new DataPoint;
	datapoint.profile = profileId;
	datapoint.customIdentifiers = ids;
	datapoint.company = company;

	Profile.findById(profileId, function(err, profile){
		if (err)
			res.status(500);

		profile.dataPoints.push(datapoint);

		datapoint.save(function(err){
			if (err) res.status(500);
		});

		profile.save(function(err){
			if (err) res.status(500);
		});
	});

	res.status(200);
	
};

//======================
// Register Handlers
//======================
router.get('/import', getImport);
router.post('/import/spec', postImportSpec);
router.post('/import/datapoint', postImportDataPoint);

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('../middleware/SetupUser');
router.use(SetupUserMiddleware);

module.exports = router;
