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

        units: {
            type: String,
            required: false
        },

        isQualitative: {
            type: Boolean,
            required: true,
            default: false
        },

        isQuantitative: {
            type: Boolean,
            required: true,
            default: false
        },

        threshold: {
            min: {
                type: Number,
                required: false
            },

            max: {
                type: Number,
                required: false
            }
        },

    }),
    Test = mongoose.model('test', TestSchema);

module.exports = Test;
