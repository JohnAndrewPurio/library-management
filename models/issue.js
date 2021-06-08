const {Schema, SchemaTypes, model} = require('mongoose')

const IssueSchema = new Schema({
    issuer: {
        type: SchemaTypes.ObjectId,
        ref: 'Member',
        required: true,
    },

    book: {
        type: SchemaTypes.ObjectId,
        ref: 'Book',
        required: true,
    },

    returnDays: {
        type: Number,
        default: 6
    },

    isAvailable: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true,})

const IssueModel = new model("Issue", IssueSchema)

module.exports = IssueModel