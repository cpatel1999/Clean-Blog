const path = require('path')

//Express-edge package is needed to use templating engine in the application
const expressEdge = require('express-edge')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

const Post = require("./Database/models/Post")



const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loggedInUserController = require('./controllers/loggedInUser')

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

//This package is used to store session info in the MongoDB database
const mongoStore = connectMongo(expressSession)


app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(connectFlash())


const storePostMiddleware = require('./middleware/storePost')
const authMiddleware = require('./middleware/auth')

// app.use('/posts/store', storePostMiddleware)
// app.use('/posts/new', authMiddleware)
//-----------------------------------Get Requests------------------------------

app.get("/", homePageController)
app.get('/posts/new', authMiddleware, createPostController)
app.get("/post/:id", getPostController)
app.get('/auth/register', createUserController)
app.get('/auth/login', loginController)

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

//------------------------Post Requsts-------------------------------

app.post('/posts/store', authMiddleware, storePostMiddleware, storePostController)
app.post('/users/register', storeUserController)
app.post('/users/login', loggedInUserController)


app.listen(4000, () => {
    console.log('App is listening on port 4000.')
})