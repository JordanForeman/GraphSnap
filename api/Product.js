var mongoose = require("mongoose"),
	Product = require("../models/Product");

module.exports = function(app){

	app.get("/api/Products/:typeId", function(req, res){
		
		var productTypeId = req.params.typeId;

		Product.find({productType: productTypeId})
		.populate("customFields")
		.exec(function(err, products){
			if (err) return console.log(err);
			res.json(products);
		});
	});

};