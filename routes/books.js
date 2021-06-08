const express = require('express')
const { readData } = require('../controllers/categoryController')
const { addBook } = require('../controllers/bookController')
const router = express.Router()

router.use(express.urlencoded())

router
    .route('/')
    .get(getFormHandler)
    .post(postFormHandler)

async function getFormHandler(request, response) {
    const contentVars = {
        categories: await readData('categories')
    }

    response.render('addBook', contentVars)
}

async function postFormHandler(request, response) {
    const body = request.body

    await addBook(body)

    response.redirect('/')
}

const bookIDHandler1 = (request, response, next) => {
    const id = request.params.bookID

    if(id > 0) {
        next()

        return
    }

    response.send('Invalid input')
}

const bookIDHandler2 = (request, response) => {
    response.send('Book requested: ' + request.params.id)
}

router.get('/:bookID', [bookIDHandler1, bookIDHandler2])

module.exports = router