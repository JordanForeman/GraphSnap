var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	companySchema = new Schema({

		name: {
			type: String,
			required: true
		},

		creationDate: {
			type: Date,
			default: Date.now
		},

		tier: [{
			type: String,
			default: 'basic'
		}],

		users: [{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}]

	});

Company = mongoose.model('company', companySchema);

module.exports = Company;
