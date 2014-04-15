var mongoose = require('mongoose'),
	Profile = require("../models/Profile");

module.exports = function(app){

	app.get('/api/Profile/:id', function(req, res){
		Profile.findById(req.params.id)
		.exec(function(err, profile){
			if (err){//TODO
			}
			res.json(profile);
		});
	});

	app.get('/api/Profile/all', function(req, res){

		Profile.count({}, function(err, count){
			console.log(count);
		});

		Profile.find({}, function(err, profiles){
			if (err)
			{
				//TODO: gracefully return api failure
				console.log(err);
			}
			res.json(profiles);
		});
	});

};
