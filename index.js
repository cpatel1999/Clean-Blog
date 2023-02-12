const path = require('path')

//Express-edge package is needed to use templating engine in the application
const expressEdge = require('express-edge')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const Post = require("./Database/models/Post")


//Starts server
const app = new express()

//Establishes connection with mongodb
mongoose.connect('mongodb://localhost/CLEAN-BLOG')


app.use(fileUpload())


app.use(express.static('public'))


app.use(expressEdge)
app.set('views', `${__dirname}/views`);


//Used to send deata from form to database
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const customMiddleware = (request, response, next) => {
    console.log('I HAVE BEEN CALLED')
    next()
}

app.use(customMiddleware)

//-----------------------------------Get Requests------------------------------

app.get("/", async (request, response) => {

    const posts = await Post.find({})
    // response.sendFile(path.resolve(__dirname, 'pages/index.html'))
    // console.log(posts)
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

app.get("/post/:id", async (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/post.html'))
    
    console.log(request.params) // Returns the object of parameters passed in the URL

    const post = await Post.findById(request.params.id)

    console.log(post)
    //If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('post', {
        post : post
    })
})



//------------------------Post Requsts-------------------------------

app.post('/posts/store', (request, response) => {
    console.log(request.files)
    const { image } = request.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...request.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            response.redirect('/')
        })
    })
    
})




app.listen(4000, () => {
    console.log('App is listening on port 4000.')
})