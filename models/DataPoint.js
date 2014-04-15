var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var dataPoint;

try
{
	if (mongoose.model('dataPoint'))
		dataPoint = mongoose.model('dataPoint');
}
catch(e)
{
	if (e.name === 'MissingSchemaError') {

		var dataPointSchema = new Schema({

			profile: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'profile'
			},

			value: {
				type: Number,
				required: true,
				default: 0
			},

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

		dataPoint = mongoose.model('dataPoint', dataPointSchema);
	}
}

module.exports = dataPoint;
