var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	User = require('./User'),
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

companySchema.methods.getAllUsers = function(cb) {
	User.find({ company : this }, cb);
};

companySchema.methods.getAllUsersToNotify = function(cb) {
	//TODO: eventually we'll filter this...not sure how yet
	return this.getAllUsers(cb);
};

try {
	Company = mongoose.model('company', companySchema);
} catch(err) {
	Company = mongoose.model('company');
}

module.exports = Company;
