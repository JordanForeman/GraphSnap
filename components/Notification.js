var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema,
	notificationSchema = new Schema({

		company: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'company'
		},

		severity: {
			type: String,
			default: ''
		},

		message: {
			type: String,
			required: true
		},

		sentTo: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'user'
		},

		creationDate: {
			type: Date,
			default: Date.now
		},

	});

notificationSchema.statics.findAllForUser = function(userId, cb) {

	//TODO: validate userId?
	var Notification = this || mongoose.model('notification');
	Notification.find({ sentTo : userId }, cb);

};

Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
