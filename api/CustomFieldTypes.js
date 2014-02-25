var CustomFieldTypes = require('../models/CustomFieldType');

module.exports = function(app){

	app.get('/api/CustomFieldTypes/:productTypeId', function(req, res){

		var productTypeId = req.params.productTypeId;

		CustomFieldTypes.find({productType : productTypeId}, function(err, customFieldTypes){
			if (err) return console.log(err);
			res.json(customFieldTypes);
		});

	});

};