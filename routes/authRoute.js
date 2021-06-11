const express = require('express')
const router = express.Router()
const { addNewUser, getAllUsers, loginUser } = require('../controllers/userController') 

router.use(express.urlencoded({ extended: true }))

router.get('/', async (request, response) => {
    const users = await getAllUsers()

    response.send(users)
})

router.post('/signup', async (request, response) => {
    const { body } = request

    console.log(body)

    const result = await addNewUser(body)

    if(result.error) {
        response.statusCode = 400
        response.send(result.error)

        return
    }

    response.send(result)
})

router.post('/login', async (request, response) => {
    const { body } = request

    const result = await loginUser(body)

    if(result.error) {
        response.statusCode = 400
        response.send(result.error)

        return
    }

    response.send(result)
})

module.exports = router