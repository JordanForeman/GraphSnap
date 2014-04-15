var DataPoint = require('../models/DataPoint'),
	Profile = require('../models/Profile');

module.exports = function(app){

	app.get('/Charts', function(req, res){

		res.locals.useCharts = true;

		if (!req.user)
			res.redirect('/');

		Profile.find({}, function(err, profiles){

			if (err) console.log(err);

			res.render('Chart/index', {profiles: profiles});

		});

	});

};
