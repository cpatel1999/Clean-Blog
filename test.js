//Import mongoose to use mongoDB
const mongoose = require('mongoose')

//Import Post schema
const Post = require('./Database/models/Post')

//Establish connection with the database
mongoose.connect('mongodb://localhost/CLEAN-BLOG-TEST')



//---------------------------FIND DOCUMENT------------------------

//find method of the model finds all the documents matches with conditions provided in the object past as an argument. It returns array of objects
// Post.find({
//     title: 'My first blog post'
// }, (error, posts) => {
//     console.log(error, posts)
// })


//If the object is empty, e.g find({}) then it retrieves all the documents.
// Post.find({},(error, posts) => {
//     console.log(error, posts)
// })

//Finds specific document by specific document id.
Post.findById("63e44b71b803ab1657a45999", (error, post) => {
    console.log(error, post)
})



//---------------------------FIND AND UPDATE DOCUMENT------------------------

//Finds document by id and updates it
// Post.findByIdAndUpdate("63e44b71b803ab1657a45999", {
//     description: "First blog post description",
//     content: "Firtst lorem ipsum content"
// }, (error, post) => {
//     console.log(error, post)
// })

//---------------------------CREATE DOCUMENT------------------------

//Creates the new document in the specified colection.
//Following line creates new document with the structure specified in postSchema and inserts into the Post collection.
// Post.create({
//     title: "My second blog post",
//     description: "Second Blog post description",
//     content: "Second Lorem ipsum content"
// }, (error, post) => {
//     console.log(error, post)
// })