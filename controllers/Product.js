var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	Product = require("../models/Product");

module.exports = function(app){

	app.get("/products/createNew", function(req, res){
		res.render('Product/create');
	});

	app.post("/products/createNew", function(req, res){
		var prod = new Product;
		prod.productName = req.body.productName;
		prod.save(function(err){
			if (err) console.log(err);
		});
		res.redirect("/products");
	});

	app.get("/products", function(req, res){
		Product.find({}, function(err, products){
			//TODO: handle error
			res.render("Product/index", {products: products});
		});
	});

	app.get("/products/:id", function(req, res){
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
