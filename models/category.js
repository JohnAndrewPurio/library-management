const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const CategoryModel = new model("Category", CategorySchema)

module.exports = CategoryModel