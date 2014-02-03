var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productProfileSchema = new Schema({

		//TODO: create product profile schema
		productName: {
			type: String,
			required: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

		supplier: {
			type: String,
			required: true
		},

		tests: {
			type: Array
		},

		charts: {
			type: Array
		}

	}),
	ProductProfile = mongoose.model('productProfile', productProfileSchema);

module.exports = ProductProfile;
