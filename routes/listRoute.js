const express = require('express')
const { readData } = require('../controllers/categoryController')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router
    .route('/')
    .get(getFormHandler)

async function getFormHandler(request, response) {
    const books = await readData('books')

    response.send(books)
}

module.exports = router