var CustomFieldTypes = require('../models/CustomFieldType');

module.exports = function(app){

	app.get('/api/CustomFieldTypes/:productTypeId', function(req, res){

		var productTypeId = req.params.productTypeId;

		CustomFieldTypes.find({productType : productTypeId}, function(err, customFieldTypes){
			if (err) return console.log(err);
			res.json(customFieldTypes);
		});

	});

	app.get('/api/CustomFieldTypes/GetById/:id', function(req, res){
		var id = req.params.id;

		CustomFieldTypes.findOne({_id: id}, function(err, customFieldType){
			if (err) return console.log(err);
			res.json(customFieldType);
		});
	});

};