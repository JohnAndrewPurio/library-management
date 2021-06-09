const readlineSync = require('readline-sync');
const {connection} = require('mongoose')

const displayOptions = require('./helperFunctions/displayOptions')
const connectToDB = require('./helperFunctions/connectToDB')
const {
    createNewCategory, createNewBook, toDeleteCategory, toDeleteBook, querySearch, queryAddMember, queryDeleteMember, queryIssueBook,
    queryReturnBook, queryBookIssueHistory, queryGetBooksByCategory
} = require('./helperFunctions/queries')

const {readData, addCategory, deleteCategory} = require('./controllers/categoryController')
const {addBook, deleteBook, searchBook, getBooksByCategory} = require('./controllers/bookController')
const {addMember, deleteMember} = require('./controllers/memberController')
const {issueBook, returnBook, activeIssues, getIssueHistory} = require('./controllers/issueController')

async function main() {
    await connectToDB('library')
    const selected = displayOptions()
    let response, category, data, bookData

    try {
        switch(Number(selected)) {
            case 1:
                category = 'categories'
                data = await readData(category)
                displayData( data, category )
                
                break
            case 2: 
                response = createNewCategory()
                console.log( await addCategory(response) )
    
                break
            case 3:
                response = toDeleteCategory()
                console.log( await deleteCategory(response) )
    
                break      
            case 4:
                category = 'books'
                data = await readData(category)
                displayData( data, category )
    
                break 
            case 5:
                response = createNewBook()
                console.log( await addBook(response) )

                break
            case 6:
                response = toDeleteBook()
                console.log( await deleteBook(response) )
    
                break
            case 7:
                response = querySearch()
                bookData = await searchBook(response)
                displayData(bookData, 'books')
    
                break
            case 8:
                response = queryGetBooksByCategory()
                bookData = await getBooksByCategory(response)
                console.log(`\nThe book/s with category ${response} is/are:`)
                displayData(bookData, 'books')

                break
            case 9: 
                category = 'members'
                data = await readData(category)
                displayData( data, category )

                break
            case 10:
                response = queryAddMember()
                console.log( await addMember(response) )

                break
            case 11: 
                response = queryDeleteMember()
                console.log( await deleteMember(response) )      
    
                break
            case 12:
                const {title, member} = queryIssueBook()
                console.log( await issueBook(title, member) )
    
                break  
            case 13: 
                response = queryReturnBook()
                console.log( await returnBook(response) )

                break
            case 14:
                displayIssuedBooks( await activeIssues() )    

                break
            case 15: 
                response = queryBookIssueHistory()
                data = await getIssueHistory(response)
                displayIssuedBooks(data)

                break
            case 0:
                console.clear()
                console.log('\n\nBye, have a great time~\n\n')
                connection.close()
                return
            
            default: 
                console.log('Option Not Available')
        }
    } catch(e) {
        console.log(e)
    }
    

    setTimeout( () => main(), 2000)  
}

function displayData(data, category) {
    console.log('\n\n********************\n')
    if(!data.length) console.log(`No ${category} found`)
    data.forEach( ele => console.log(ele.name ? ele.name: ele.title + ' by ' + ele.authors) )
    console.log('\n********************\n\n')
}

function displayIssuedBooks(issuedBooks) {
    issuedBooks.forEach( book => console.log(book) )
}

main()