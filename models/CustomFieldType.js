var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	customFieldTypeSchema = new Schema({

		name: {
			type: String,
			required: true
		},

		dataType: {
			type: Schema.Types.Mixed,
			required: true
		},

		productType: {
			type: Schema.Types.ObjectId,
			ref: 'productType',
			required: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		}

	}),
	CustomFieldType = mongoose.model('customFieldType', customFieldTypeSchema);

module.exports = CustomFieldType;
