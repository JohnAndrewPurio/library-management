const {Schema, model} = require('mongoose')

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    userId: {
        type: Number,
        default: Date.now,
    },

})

const MemberModel = new model("Member", MemberSchema)

module.exports = MemberModel