var TestValue = require("../TestValue"),
	Test = require("../Test");

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getReportByTestId = function(req, res){
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
};

//======================
// POST Handlers
//======================
//======================
// Register Handlers
//======================
router.get('/Report/Test/:testId', getReportByTestId);

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('../middleware/SetupUser');
router.use(SetupUserMiddleware);

module.exports = router;