var mongoose = require('mongoose'),
	ProductType = require("../models/ProductType");

// TODO:
module.exports = function(app){

	app.get('/api/ProductTypes/:id', function(req, res){
		ProductType.findById(req.params.id, function(err, productType){
			if (err)
			{
				//TODO: gracefully return API failure
			}

			res.json(productType);
		});
	});

	app.get('/api/ProductTypes/all', function(req, res){
		
		ProductType.count({}, function(err, count){
			console.log(count);
		});

		ProductType.find({}, function(err, productTypes){
			if (err)
			{
				//TODO: gracefully return api failure
				console.log(err);
			}

			console.log(productTypes);
			res.json(productTypes);
		});
	});

};