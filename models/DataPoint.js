var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Notification = require('../models/Notification'),
	Test = require('../models/Test');

var dataPointSchema = new Schema({

	profile: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'profile'
	},

	testValues: [{
		type: Schema.Types.ObjectId,
		ref: 'testValue'
	}],

	customIdentifiers: [{
		type: String
	}],

	company: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'company'
	},

	createdDate: {
		type: Date,
		default: Date.now,
		required: true
	},

});

dataPointSchema.methods.getdataPointsOfType = function(dataPointTypeId){
};

dataPointSchema.methods.save = function(cb){
	//this.generateNotifications();
	this.save(cb);
};

// generates notifications and stores them in the database 
dataPointSchema.methods.generateNotifications = function(){
	var failedTests = this.getFailedTests();

	//TODO: get list of all users in company with alert access
	this.company.getAllUsers(this.createNotesForUsers);
};

// Callback function
dataPointSchema.methods.createNotesForUsers = function(err, receivers){
	for (var i = 0, len = failedTests.length; i < len; i++) {
		var failure = failedTests[i];

		for (var j = 0, jlen = receivers.length; j < jlen; j++){
			var receiver = receivers[i],
				note = new Notification({
					company : null,
					severity : failure.severity,
					sentTo : receiver
				});

			note.save();
		}
	}
};

// returns an array of objects representing data that triggers test limits
dataPointSchema.methods.getFailedTests = function() {
	var failedTests = [];

	var testValues = {};
	for (var i = 0, len = this.testValues.length; i < len; i++) {
		var testValue = this.testValues[i];
		testValues[testValue.test] = testValue[i];
	}

	for (var i = 0; i < this.tests.length; i++) {
		var test = this.tests[i],
			testID = test._id,
			marg = test.threshold.min,
			crit = test.threshold.max,
			value = testValues[testID].quantValue || testValues;

		if (value >= crit) {
			//TODO: create critical notification
			failedTests.push({
				test: test,
				severity: 'CRITICAL'
			});
		}
		else if (value >= marg) {
			//TODO: create marginal notification
			failedTests.push({
				test: test,
				severity: 'CRITICAL'
			});
		}
	}

};

var dataPoint = mongoose.model('dataPoint', dataPointSchema);

module.exports = dataPoint;
