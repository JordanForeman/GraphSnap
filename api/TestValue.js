var mongoose = require("mongoose");

var TestValue = require("../components/TestValue");

var router = require('express').Router();

// Handlers
var getTestValuesByTestId = function(req, res) {
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
};

//======================
// Register Handlers
//======================
router.get('/TestValues/:testId', getTestValuesByTestId);

module.exports = router;
