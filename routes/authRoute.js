const { config } = require('dotenv')

config()

const express = require('express')
const router = express.Router()
const multer = require('multer')
const jwt = require('jsonwebtoken')
const { addNewUser, getAllUsers, loginUser } = require('../controllers/userController')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const multipart = multer({ storage: storage })

router.use(express.urlencoded({ extended: true }))

router.get('/', async (request, response) => {
    const users = await getAllUsers()

    response.send(users)
})

router.post('/signup', multipart.single("profileImage"), signUpPostHandler)

router.post('/login', logInPostHandler)

async function signUpPostHandler(request, response) {
    const { body } = request

    const result = await addNewUser(body)

    if (result.error) {
        response.statusCode = 400
        response.send(result.error)

        return
    }

    response.json(result)
}

async function logInPostHandler(request, response) {
    const { body } = request

    const result = await loginUser(body)

    if(result.error) {
        response.statusCode = 400
        response.send(result)

        return
    }

    const accessToken = jwt.sign(result, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })
    const refreshToken = jwt.sign(result, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })
    const tokenData = {
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expiry: 60,
        refresh_token_expiry: 60 * 60 * 24 * 3
    }

    response.json( tokenData )
}

module.exports = router