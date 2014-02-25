var Product = require('../models/Product'),
	ProductType = require('../models/ProductType'),
	CustomFieldType = require('../models/CustomFieldType'),
	CustomField = require('../models/CustomField');

module.exports = function(app){

	app.get('/Charts', function(req, res){

		if (!req.user)
			res.redirect('/');

		ProductType.find({}, function(err, prodTypes){

			if (err) console.log(err);

			res.render('Chart/index', {productTypes: prodTypes});

		});

	});

};