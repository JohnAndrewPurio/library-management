const readlineSync = require('readline-sync');

function displayOptions() {
    const displayString = `
    Welcome to the Library
    Here are the few things you can do:

    ---Categories Operations---
        1. Read added categories
        2. Create and add a new category
        3. Delete a category

    ---Books Operations---
        4. See all books
        5. Add a book
        6. Delete a book
        7. Search a book
        8. Get all books of a category

    ---Members Operations---
        9. List of members
        10. Add a member
        11. Delete a member

    ---Issues Operations---
        12. Issue a new book
        13. Return a book
        14. See active issues
        15. Get issue history of a book

    ---Exit---
        0. Exit 
    `
    console.log(displayString)

    const optionSelected = readlineSync.question('\n\nSelect an option: ')

    return optionSelected
}

module.exports = displayOptions