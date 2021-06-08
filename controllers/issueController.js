const {connection} = require('mongoose')
const IssueModel = require('../models/issue')

async function issueBook(bookTitle, memberIssuer) {
    try {
        const book = await connection.collection('books').findOne({title: bookTitle})
        if(!book) return `There is no such book entitled ${bookTitle}`

        const issuer = await connection.collection('members').findOne({name: memberIssuer})
        if(!issuer) return `There is no such member named ${member}`

        const schema = {
            issuer: issuer,
            book: book,
        }
        const checkAvailability = await connection.collection('issues').findOne({book: book})
        if( checkAvailability ) 
            return `The ${book.title} book has already been issued`

        const issue = new IssueModel(schema)
        await issue.save()

        return `Book ${bookTitle} was issued by ${memberIssuer}`
    } catch(e) {
        console.log(e)
    }
}

async function returnBook(bookTitle) {
    const book = await connection.collection('books').findOne({title: bookTitle})
    if(!book) return `There is no such book entitled ${bookTitle} available`

    const checkAvailability = await connection.collection('issues').findOne({book: book._id})
    if(!checkAvailability) 
        return `The book entitle ${bookTitle} has not yet been issued`

    try {
        await connection.collection('issues').updateMany({book: book._id}, {$set: {isAvailable: true}})


        return `Book entitled ${bookTitle} was successfully returned`
    } catch(e) {
        console.log(e)
    }
}

async function activeIssues() {
    try {
        const active = await connection.collection('issues').find({isAvailable: false}).toArray()
        const result = []

        for(let index = 0; index < active.length; index++) {
            const issue = active[index]
            const book = await connection.collection('books').findOne({_id: issue.book})
            const issuer = await connection.collection('members').findOne({_id: issue.issuer})
            let returnDate = new Date()

            console.log(issue)

            returnDate.setDate(issue.createdAt.getDate() + issue.returnDays)

            result.push(`${book.title} book issued by ${issuer.name} and to be returned on or before ${returnDate.toLocaleDateString()}`)
        }

        return result
    } catch(e) {
        console.log(e)
    }
}

async function getIssueHistory(bookTitle) {
    const book = await connection.collection('books').findOne({title: bookTitle})
    if(!book) return `There is no such book entitled ${bookTitle} in your library`

    try {
        const bookIssues = await connection.collection('issues').find({book: book}).toArray()
        if(!bookIssues) return `The book has not been issued yet`

        return bookIssues
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    issueBook, returnBook, activeIssues, getIssueHistory
}