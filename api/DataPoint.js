var mongoose = require("mongoose"),
	DataPoint = require("../models/DataPoint");

module.exports = function(app){

	app.get("/api/DataPoint/:profileId", function(req, res){

		DataPoint.find({profile: req.params.typeId})
		.exec(function(err, dataPoints){
			if (err) return console.log(err);
			res.json(dataPoints);
		});
	});

};
