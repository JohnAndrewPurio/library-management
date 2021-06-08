const {connection} = require('mongoose')
const MemberModel = require('../models/member')

async function addMember(name) {
    const schema = {
        name: name
    }

    try {
        const member = new MemberModel(schema)
        await member.save()

        return `User ${name} @ ${member.userId} successfully added!`
    } catch(e) {
        console.log(e)
    }
}

async function deleteMember(name) {
    try {
        const category = await connection.collection('members')
        await category.deleteOne({name: name}) 

        return `\n\nMember ${name} successfully deleted\n\n`
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    addMember, deleteMember
}