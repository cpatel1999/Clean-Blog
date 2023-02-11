const path = require('path')

//Express-edge package is needed to use templating engine in the application
const expressEdge = require('express-edge')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Post = require("./Database/models/Post")


//Starts server
const app = new express()

//Establishes connection with mongodb
mongoose.connect('mongodb://localhost/CLEAN-BLOG')



app.use(express.static('public'))


app.use(expressEdge)
app.set('views', `${__dirname}/views`);


//Used to send deata from form to database
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



//-----------------------------------Get Requests------------------------------

app.get("/", async (request, response) => {

    const posts = await Post.find({})
    // response.sendFile(path.resolve(__dirname, 'pages/index.html'))
    console.log(posts)
    // If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('index', {
        posts : posts
    })
})

app.get('/posts/new', (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/create.html'))
    response.render('create')
})

app.get("/about", (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/about.html'))
    
    //If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('about')
})

app.get("/contact", (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    
    //If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('contact')
})

app.get("/post", (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/post.html'))
    
    //If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('post')
})



//------------------------Post Requsts-------------------------------

app.post('/posts/store', (request, response) => {
    Post.create(request.body, (error, post) => {
        response.redirect('/')
    })
})




app.listen(4000, () => {
    console.log('App is listening on port 4000.')
})