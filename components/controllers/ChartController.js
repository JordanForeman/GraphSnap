var	DataPoint = require('../DataPoint'),
	Profile = require('../Profile');

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getCharts = function(req, res){

	res.locals.useCharts = true;

	if (!req.user)
		res.redirect('/');

	Profile.find({}, function(err, profiles){

		if (err) console.log(err);

		res.render('Chart/index', {profiles: profiles});

	});

};

//======================
// Register Handlers
//======================
router.get('/Charts', getCharts);

//======================
// Hook up Middleware
//======================
router.use(require('../middleware/SetupUser'));

module.exports = router;
