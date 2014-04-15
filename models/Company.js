var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	companySchema = new Schema({

		name: String,

		creationDate: {
			type: Date,
			default: Date.now
		},

		tier: [{
			type: String,
			default: 'basic'
		}]

	});

Company = mongoose.model('company', companySchema);

module.exports = Company;
