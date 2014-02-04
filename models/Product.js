var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productSchema = new Schema({

		productType: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'productType'
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

	}),
	Product = mongoose.model('product', productSchema);

module.exports = Product;
