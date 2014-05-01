var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var testValue;

try
{
	if (mongoose.model('testValue'))
		testValue = mongoose.model('testValue');
}
catch(e)
{
	if (e.name === 'MissingSchemaError') {

		var testValueSchema = new Schema({

			test: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'test'
			},

			datapoint: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'dataPoint'
			},

			qualValue: {
				type: Boolean
			},

			quantValue: {
				type: Number
			}

		});

		testValue = mongoose.model('testValue', testValueSchema);
	}
}

module.exports = testValue;
