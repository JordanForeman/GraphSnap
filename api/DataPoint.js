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

	// Auth this big time man
	app.post("/api/DataPoint/UpdateIdentifier", function(req, res, next){

		var datapointID = req.body.dataPointID,
			newValue = req.body.newValue,
			identifierIndex = req.body.identifierIndex;

		console.log("========= Custom Identifier Change Request =========");
		console.log("DataPointID: " + datapointID);
		console.log("New Value: " + newValue);
		console.log("Identifier Index: " + identifierIndex);

		DataPoint.findById(datapointID)
		.exec(function(err, datapoint){

			if (err) {
				err.status = 500;
				next(err);
				return console.log(err);
			}

			console.log("DataPoint: ");
			console.log(datapoint);

			datapoint.customIdentifiers[identifierIndex] = newValue;
			datapoint.save(function(err){
				if (err) res.json(err);
				else res.send(200); 
			});

		});

	});

};
