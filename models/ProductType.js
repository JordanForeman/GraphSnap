var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productTypeSchema = new Schema({

		productName: {
			type: String,
			required: true,
			unique: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

		customFieldTypes: {
			type: Array
		},

		tests: {
			type: Array
		}

	}),
	ProductType = mongoose.model('productType', productTypeSchema);

module.exports = ProductType;
