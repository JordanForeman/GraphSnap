var mongoose = require('mongoose'),
	Company = require('./Company'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	userSchema = new Schema({

		name: String,

		email: {
			type: String,
			required: true
		},

		password: {
			type: String,
			required: true
		},

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

userSchema.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.findByEmail = function(email, cb) {
	// good idea to check if the given email is a string
	var User = this || mongoose.model('User');
	User.findOne({email: email}, cb);
};

try {
	User = mongoose.model('user', userSchema);
} catch(err) {
	User = mongoose.model('user');
}

module.exports = User;
