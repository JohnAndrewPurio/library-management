const { config } = require('dotenv')

config()

const express = require('express')
const router = express.Router()
const multer = require('multer')
const jwt = require('jsonwebtoken')
const { addNewUser, getAllUsers, loginUser } = require('../controllers/userController')
const { verifyRefreshToken } = require('../helperFunctions/verifyToken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY

const refreshTokens = []

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

router.get('/token', verifyRefreshToken, tokenGetHandler)

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

    refreshTokens.push(refreshToken)
    
    const tokenData = {
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expiry: ACCESS_TOKEN_EXPIRY,
        refresh_token_expiry: REFRESH_TOKEN_EXPIRY
    }

    response.json( tokenData )
}

async function tokenGetHandler(request, response) {
    const { headers } = request
    const accessToken = headers['authorization'].split(' ')[1]

    try {
        const { email } = await jwt.verify(accessToken, REFRESH_TOKEN_SECRET)
        const newAccessToken = jwt.sign({ email } , ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })

        const tokenData = {
            access_token: newAccessToken,
            access_token_expiry: ACCESS_TOKEN_EXPIRY,
        }

        response.json(tokenData)
    } catch(error) {
        response.statusCode = 401
        response.json(error)
        console.log(error)
    }
}

module.exports = router