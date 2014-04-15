var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ProfileSchema = new Schema({

		name: {
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

		customIdentifiers: [{
			type: String
		}],

	}),
	Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
