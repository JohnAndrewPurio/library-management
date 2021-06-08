const {Schema, SchemaTypes, model} = require('mongoose')

const BookSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: SchemaTypes.ObjectId,
        ref: 'Category',
    },

    authors: {
        type: [String],
        required: true,
    }

}, {timestamps: true,})

const BookModel = new model("Book", BookSchema)

module.exports = BookModel