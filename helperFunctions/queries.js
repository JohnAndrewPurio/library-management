const readlineSync = require('readline-sync')

function createNewCategory() {
    const response = readlineSync.question("\n\nWhat is the name of the category you want to add? ")

    return response
}

function createNewBook() {
    const response = {
        title: readlineSync.question("\n\nWhat is the title of the book you want to add? "),
        price: readlineSync.question("\nWhat is the price of the book? "),
        authors: readlineSync.question("\nWho is/are the author/s of the book? Separate it with commas "),
        category: readlineSync.question("\nWhat is the book category? "),
    }

    return response
}

function toDeleteCategory() {
    const response = readlineSync.question("\n\nWhat is the name of the category you want to remove? ")

    return response
}

function toDeleteBook() {
    const response = readlineSync.question("\n\nWhat is the title of the book you want to remove? ")

    return response
}

function querySearch() {
    const response = readlineSync.question("\n\nType the title of the book: ")

    return response
}

function queryAddMember() {
    const response = readlineSync.question("\n\nWhat is the name of the new member? ")

    return response
}

function queryDeleteMember() {
    const response = readlineSync.question("\n\nWhat is the name of the member to be deleted? ")

    return response
}

function queryIssueBook() {
    const response = {
        title: readlineSync.question("\n\nWhat is the title of the book to be issued? "),
        member: readlineSync.question("\n\nWhat is the name of the member who issued the book? "),
    }

    return response
}

function queryReturnBook() {
    const response = readlineSync.question("\n\nWhat is the title of the book to be returned? ")

    return response
}

function queryBookIssueHistory() {
    const response = readlineSync.question("\n\nWhat is the title of the book you want to check the issue history? ")

    return response
}

module.exports = {
    createNewCategory, createNewBook, toDeleteCategory, toDeleteBook, querySearch, queryAddMember, queryDeleteMember, queryIssueBook,
    queryReturnBook, queryBookIssueHistory
}