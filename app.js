const express = require('express')
const morgan = require('morgan')
const app = express()
const bookRouter = require('./routes/books')
const port = 4000
const logWare = require('./routes/logWare')
const { readData } = require('./controllers/categoryController')
const connectToDB = require('./helperFunctions/connectToDB')

connectToDB('library')

// app.use(logWare)
app.use(morgan('dev'))
app.set('view engine', 'pug')
app.use(express.static('static'))

app.get('/', async (request, response) => {
    const content = {
        message: 'Welcome to the Greatest Library',
        books: await readData('books')
    }

    response.render('index', content)
})

app.get('/books/:bookID', (request, response) => {
    console.log(request.params.bookID)
    response.send(`Book requested: ${ request.params.bookID }`)
})

app.use('/books', bookRouter)

app.all(/.*/, (request, response) => {
    response.statusCode = 404
    response.send('Page Not Found')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})