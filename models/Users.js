var mongoose = require('mongoose'),
	Company = require('../models/Company'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	userSchema = new Schema({

		name: String,

		company: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'company'
		},

		apiKey: {
			type: String,
			required: true
		},

		joinDate: {
			type: Date,
			default: Date.now
		},

		roles: [{
			type: String,
			default: 'user'
		}]

	});

userSchema.plugin(passportLocalMongoose,
{
	usernameField: 'email',
});

userSchema.methods.isAdmin = function(){
	return this.user.roles.indexOf("admin") >= 0;
};

userSchema.methods.getCompany = function(){
	var companyId = this.user.company;

	Company.findById(companyId, function(err, company){
		if (err) return console.log(err);

		return company;
	});
};

userSchema.statics.findByEmail = function(email, cb) {
	// good idea to check if the given email is a string
	var User = this || mongoose.model('User');
	User.findOne({email: email}, cb);
};

User = mongoose.model('user', userSchema);

module.exports = User;
