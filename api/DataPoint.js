var mongoose = require("mongoose"),
	DataPoint = require("../models/DataPoint");

module.exports = function(app){

	app.get("/api/DataPoints", function(req, res){
		if (!req.user)
			res.redirect('/');

		DataPoint.find({company: req.user.company})
		.populate('profile')
		.exec(function(err, dps){
			if (err) return console.log(err);

			res.json(dps);
		});
	});

	app.get("/api/DataPoint/:profileId", function(req, res){

		DataPoint.find({profile: req.params.typeId})
		.exec(function(err, dataPoints){
			if (err) return console.log(err);
			res.json(dataPoints);
		});
	});

};
