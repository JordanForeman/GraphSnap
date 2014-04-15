var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ProfileSchema = new Schema({

		name: {
			type: String,
			required: true,
			unique: true
		},

		dataPoints: [{
			type: Schema.Types.ObjectId,
			ref: 'dataPoint'
		}],

		createdDate: {
			type: Date,
			default: Date.now,
			required: true
		},

		company: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'company'
		},

		tests: {
			type: Array
		},

		customIdentifiers: [{
			type: String
		}],

	}),
	Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
