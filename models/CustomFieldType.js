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

		productTypeId: {
			type: String,
			required: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		}

	}),
	CustomFieldType = mongoose.model('product', customFieldTypeSchema);

module.exports = CustomFieldType;