var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TestSchema = new Schema({

        name: {
            type: String,
            required: true,
            unique: true
        },

        profile: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'profile'
        },

        company: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'company'
        },

        threshold: {
            min: {
                type: Number,
                required: true,
                default: 0
            },

            max: {
                type: Number,
                required: true,
                default: 0
            }
        },

    }),
    Test = mongoose.model('test', TestSchema);

module.exports = Test;
