var TestValue = require("../models/TestValue"),
	Test = require("../models/Test");

module.exports = function(app){

	app.get('/Report/Test/:testId', function(req, res){
		if (!req.user) res.redirect('/login');

		var testId = req.params.testId;

		Test.findById(testId, function(err, test){
			if (err) return console.log(err);

			TestValue.find({test: test})
			.exec(function(err, testValues){
				if (err) return console.log(err);

				console.log(testValues);
				res.render('Report/test', {values: testValues, test: test, useCharts: true});

			});
		});
	});

};