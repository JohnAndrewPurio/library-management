const { config } = require('dotenv')

config()

const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET

async function verifyToken(request, response, next) {
    const { headers } = request
    const accessToken = headers['authorization'].split(' ')[1]
    console.log(accessToken)

    try {
        const verify = await jwt.verify(accessToken, SECRET_KEY)

        next()
    } catch(error) {
        response.sendStatus(403)
    }
    
}

module.exports = verifyToken