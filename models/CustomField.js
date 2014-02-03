var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	customFieldSchema = new Schema({

		customFieldType: {
			type: String,
			required: true
		},

		value: {
			type: Schema.Types.Mixed,
			required: true
		},

		productId: {
			type: String,
			required: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		}

	}),
	CustomField = mongoose.model('product', customFieldSchema);

module.exports = CustomField;