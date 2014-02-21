var mongoose = require('mongoose'),
	CustomFieldType = require("../models/CustomFieldType"),
	Product = require("../models/Product"),
	CustomField = require("../models/CustomField"),
	ProductType = require("../models/ProductType");

// TODO:
module.exports = function(app){

	app.get('/ProductType', function(req, res){
		ProductType.find({}, function(err, prodTypes){
			if (err){
				console.log(err);
				res.redirect('/');
			}

			res.render('ProductType/index', {productTypes: prodTypes});
		});
	});

	app.get('/ProductType/CreateNew', function(req, res){
		if (!req.user)
			res.redirect('/login');


		res.render('ProductType/create');
	});

	app.post('/ProductType/CreateNew', function(req, res){
		if (!req.user)
			res.redirect('/login');

		var prodType = new ProductType;
		prodType.productTypeName = req.body.productName;
		prodType.save(function(err){
			if (err) console.log(err);
		});
		res.redirect("/Products");
	});

	app.get('/ProductType/:id', function(req, res){
		ProductType.findById(req.params.id, function(err, prodType){
			if (err){
				console.log(err);
				res.redirect("/Products");
			} else {
				res.render("ProductType/single", {ProductType: prodType});
			}
		});
	});

	app.get('/ProductType/:id/AddField', function(req, res){
		console.log("Add Field to ID: " + req.params.id);
		ProductType.findById(req.params.id, function(err, prodType){
			if (err){
				console.log(err);
				res.redirect("/Products");
			}

			res.render("ProductType/AddField", {ProductType : prodType})
		});
	});

	app.post('/ProductType/:id/AddField', function(req, res){
		var cft = new CustomFieldType;
		cft.productType = req.params.id;
		cft.name = req.body.fieldName;
		cft.dataType = req.body.fieldType;

		ProductType.findById(req.params.id, function(err, prodType){
			prodType.customFieldTypes.push(cft);
			prodType.save(function(err){
				if (err) console.log(err);
			});

			Product.find({productType : prodType})
					.populate('customFields')
					.exec(function(err, products){

						for (var i = 0; i < products.length; i++)
						{
							var newField = new CustomField;
							newField.productId = products[i];
							newField.value = null;
							newField.customFieldType = cft;
							newField.name = cft.name;

							newField.save();

							products[i].customFields.push(newField._id);
						}

					});
		});

		cft.save(function(err){
			if (err) console.log(err);
		});

		res.redirect("/Products");
	})

};
