
//Import mongoose in the application
const mongoose = require('mongoose')

//Define schema structure
//Schema is similar to tables in SQL databases.
const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//Define the schema name and bind it with the structure
//Here, name of the schema is Post and its structure is PostStructure
const Post = mongoose.model('Post', PostSchema)

//Exports the model
module.exports = Post