var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	userSchema = new Schema({

		name: String,
		
		joinDate: {
			type: Date,
			default: Date.now
		},

		role: String

	});

userSchema.plugin(passportLocalMongoose, 
{
	usernameField: 'email',
});

User = mongoose.model('user', userSchema);

module.exports = User;
