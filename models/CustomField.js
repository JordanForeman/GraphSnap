var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	customFieldSchema = new Schema({

		customFieldType: {
			type: Schema.Types.ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},

		value: {
			type: Schema.Types.Mixed,
			default: null
		},

		productId: {
			type: Schema.Types.ObjectId,
			required: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		}

	}),
	CustomField = mongoose.model('customField', customFieldSchema);

module.exports = CustomField;