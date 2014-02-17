var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	productSchema = new Schema({

		notificationType: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'notificationType'
		},

		severity: {
			type: Number,
			required: true,
			default: 0 // 0 - normal, 1 - important, 2 - urgent (?)
		},

		isUnread: {
			type: Boolean,
			required: true,
			default: true
		},

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'user'
		}

	}),
	Product = mongoose.model('product', productSchema);

module.exports = Product;
