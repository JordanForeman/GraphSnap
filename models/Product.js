var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productSchema = new Schema({

		productTypeId: {
			type: String,
			required: true,
			unique: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

	}),
	Product = mongoose.model('product', productSchema);

module.exports = Product;
