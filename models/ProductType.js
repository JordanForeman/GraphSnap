var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productTypeSchema = new Schema({

		productTypeName: {
			type: String,
			required: true,
			unique: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

		tests: {
			type: Array
		},

		customFieldTypes: [{
			type: Schema.Types.ObjectId,
			ref: 'customFieldType'
		}],

	}),
	ProductType = mongoose.model('productType', productTypeSchema);

module.exports = ProductType;
