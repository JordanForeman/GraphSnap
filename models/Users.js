var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	userSchema = new Schema({

		name: String,

		company: {
			type: Schema.Types.ObjectId,
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

User = mongoose.model('user', userSchema);

module.exports = User;
