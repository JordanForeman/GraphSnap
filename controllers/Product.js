var BaseController = require("./Base"),
	View = require("../views/Base"),
	passport = require('passport'),
	User = require("../models/Users"),
	Schema = require('mongoose').Schema,
	ProductType = require("../models/ProductType"),
	CustomField = require("../models/CustomField"),
	CustomFieldType = require("../models/CustomFieldType"),
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

		ProductType.findById(req.body.productTypeId)
		.populate('customFieldTypes')
		.exec(function(err, prodType){
			
			var fields = prodType.customFieldTypes,
				productCustomFields = Array();

			for(var i = 0; i < fields.length; i++)
			{
				var field = new CustomField;

				var inputFieldName = fields[i].name.replace(/\s+/g, '-').toLowerCase();


				field.name = fields[i].name;
				field.customFieldType = fields[i]._id;
				field.value = req.body[inputFieldName];
				field.productId = prod;

				prod.customFields.push(field._id);
				
				field.save(function(err){
					if (err) console.log(err);
				}); //TODO: err?
			}

			prod.productType = prodType;
			prod.save(function(err){
				if (err) console.log(err);
			});

		});

		res.redirect("/products");
	});

	app.get("/Products", function(req, res){
		if (!req.user)
			res.redirect('/login');

		//Get ProductTypes
		ProductType.find({}, function(err, prodTypes){
			if (err) console.log(err);

			//Get Products
			Product.find({})
			.populate('productType')
			.populate('customFields')
			.exec(function(err, prods){
				if (err) console.log(err);

				res.render("Product/index", {
					productTypes: prodTypes,
					products: prods
				});
			})
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
