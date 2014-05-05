var mongoose = require("mongoose"),
	TestValue = require("../models/TestValue");

module.exports = function(app){

	app.get("/api/TestValues/:testId", function(req, res){
		if (!req.user)
			res.redirect('/');

		TestValue.find({test: req.params.testId})
		.sort({dateCreated: -1})
		.populate('datapoint')
		.exec(function(err, testValues){
			if (err) return console.log(err);

			console.log(testValues);
			res.json(testValues);
		});
	});

};
