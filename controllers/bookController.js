const {connection} = require('mongoose')
const BookModel = require('../models/book')

async function addBook({title, authors, price, category}) {
    const categories = await connection.collection('categories').findOne({name: category})

    if( !categories ) {
        return 'No such category'
    }

    const schema = {
        title: title,
        authors: authors.split(','),
        price: Number(price),
        category: categories
    }

    try {
        const book = new BookModel(schema)
        await book.save()
    
        return '\n\nData successfully added to database\n\n'
    } catch(e) {
        console.log(e)
    } 
}

async function deleteBook(title) {
    const query = await connection.collection('books').findOne({title: title})

    if(!query) return `No such book entitled ${title}`

    try {
        const category = await connection.collection('books')
        await category.deleteOne({title: title}) 

        return `\n\n${title} book successfully deleted\n\n`
    } catch(e) {
        console.log(e)
    }
}

async function searchBook(query) {
    const searchQuery = {
        title: {
            $regex: RegExp(query),
            $options: 'i'
        }
    }

    try {
        const data = await connection.collection('books').find(searchQuery).toArray()

        return data
    } catch(e) {
        console.log(e)
    }  
}

async function getBooksByCategory(category) {
    try {
        const categoryData = await connection.collection
        const data = await connection.collection('categories').find({category: category})
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    addBook, deleteBook, searchBook
}