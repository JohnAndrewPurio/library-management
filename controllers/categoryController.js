const {connection} = require('mongoose')
const CategoryModel = require('../models/category')

async function readData(category) {
    console.clear()
    try {
        const data = await connection.collection(category).find().toArray()

        return data
    } catch(e) {
        console.log(e)
    }  
}

async function addCategory(name) {
    try {
        const category = new CategoryModel({name: name})
        await category.save()
    
        return '\n\nData successfully added to database\n\n'
    } catch(e) {
        console.log(e)
    } 
}

async function deleteCategory(name) {
    try {
        const category = await connection.collection('categories')
        await category.deleteOne({name: name}) 

        return `\n\n${name} category successfully deleted\n\n`
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    readData, addCategory, deleteCategory
}