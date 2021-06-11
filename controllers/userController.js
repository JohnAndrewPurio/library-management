const { connection } = require('mongoose')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

async function addNewUser({name, email, password, profileImage}) {
    if(!validEmail.test(email)) {
        return { error: 'Invalid email' }
    }

    const schema = {
        name: name,
        email: email,
        password: await generatePasswordHash(password),
        profileSrc: profileImage,
    }

    try {
        const user = new UserModel(schema)
        const savedUser = await user.save()

        return savedUser
    } catch(error) {
        return {error}
    }
}

async function loginUser({email, password}) {
    try {
        const user = await connection.collection('users').findOne({email: email})
        await bcrypt.compare(password, user.password, (error, result) => {
            // if(error) return {error}
            // if(!result) return {error: 'Invalid Password'}

            // console.log(error, result, user.password)
        })

        return user
    } catch(error) {
        return {error}
    }
}

async function getAllUsers() {
    try {
        const users = connection.collection('users').find().toArray()

        return users
    } catch(e) {
        console.log(e)
    }
}

async function generatePasswordHash(password) {
    try {
        const hash = await bcrypt.hash(password, 10)

        return hash
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    addNewUser, getAllUsers, loginUser
}