var mongoose = require("mongoose"),
	CustomField = require("../models/CustomField");

module.exports = function(app){

	app.post("/api/CustomField/Update", function(req, res){
		
		var id = req.body.id,
			value = req.body.value;

		console.log(id + value);

		CustomField.findOne({_id: id}, function(err, field){
			if (err) return console.log(err);

			field.value = value;
			field.save();
		});
	});

	app.get("/api/CustomField/TypeId/:id", function(req, res){
		CustomField.find({customFieldType : req.params.id}, function(err, fields){
			if (err) return console.log(err);
			console.log(fields);
			res.json(fields);
		});

	});

};