const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bookRouter = require('./routes/books')
const authRouter = require('./routes/authRoute')
const port = 4000
const logWare = require('./routes/logWare')
const { readData } = require('./controllers/categoryController')
const { deleteBookRequest } = require('./controllers/bookController')
const connectToDB = require('./helperFunctions/connectToDB')

connectToDB('library')

// app.use(logWare)
app.use(morgan('dev'))
app.set('view engine', 'pug')
app.use(express.static('static'))
app.use(express.json())
app.use(cors())

app.get('/', async (request, response) => {
    const books = await readData('books')

    response.send(books)
})

app.get('/books/:bookID', (request, response) => {
    console.log(request.params.bookID)
    response.send(`Book requested: ${ request.params.bookID }`)
})

app.get('/books_list', async (request, response) => {
    const books = await readData('books')

    response.send(books)
})

app.delete('/books/:bookID', async (request, response) => {
    try {
        const bookID = request.params.bookID
        const answer = await deleteBookRequest(bookID)
    
        response.sendStatus(201)
    } catch(e) {
        response.sendStatus(404)
    }
    
})

app.use('/books', bookRouter)
app.use('/users', authRouter)

app.all(/.*/, (request, response) => {
    response.statusCode = 404
    response.send('Page Not Found')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})