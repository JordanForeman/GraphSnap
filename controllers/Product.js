var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	User = require("../models/Users"),
	ProductType = require("../models/ProductType"),
	Product = require("../models/Product");

module.exports = function(app){

	app.get("/Products/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		ProductType.find({}, function(err, prodTypes){
			if (err) console.log(err);

			res.render('Product/create', {productTypes: prodTypes})
		});
	});

	app.get("/Products/:id/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		ProductType.findById(req.params.id, function(err, prodType){
			res.render('Product/create', {productType: prodType});
		});
	});

	app.post("/Products/CreateNew", function(req, res){
		if (!req.user)
			res.redirect('/login');

		var prod = new Product;
		prod.productName = req.body.productName;

		ProductType.findById(req.body.productTypeId, function(err, prodType){
			prod.productType = prodType;
		});

		prod.save(function(err){
			if (err) console.log(err);
		});

		res.redirect("/products");
	});

	app.get("/Products", function(req, res){
		if (!req.user)
			res.redirect('/login');

		var productTypes;

		ProductType.find({}, function(err, prodTypes){
						if (err) console.log(err);
						productTypes = prodTypes;
					});

		ProductType.count({}, function(err, count){
			console.log(count);
			if (count <= 0)
				productTypes = null;
		});

		console.log(productTypes);

		Product.find({}, function(err, products){
			//TODO: handle error
			res.render("Product/index", {
				productTypes: productTypes, 
				products: products
			});
		});
	});

	app.get("/Products/:id", function(req, res){
		if (!req.user)
			res.redirect('/login');

		Product.findById(req.params.id, function(err, product){
			if (err){
				console.log(err);
				res.redirect("/products");
			} else {
				res.render("Product/single", {product: product});
			}
		});
	});

};
