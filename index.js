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
const edge = require('edge.js')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loggedInUserController = require('./controllers/loggedInUser')
const logoutController = require('./controllers/logout')

//Starts server
const app = new express()

//Establishes connection with mongodb
mongoose.connect('mongodb://localhost/CLEAN-BLOG')

app.use(fileUpload())

//Registers the static public library folder
//It is used to load the assets
app.use(express.static('public'))

//Used for templating engine
app.use(expressEdge)
app.set('views', `${__dirname}/views`);

app.use(connectFlash())

//This package is used to store session info in the MongoDB database
const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))


//Used to send data from form to database
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const storePostMiddleware = require('./middleware/storePost')
const authMiddleware = require('./middleware/auth')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticated')
const availableGloballyMiddleware = require('./middleware/availableGlobally')

// Used to make userId stored in the session available globally.
app.use('*', availableGloballyMiddleware)

// app.use('/posts/store', storePostMiddleware)
// app.use('/posts/new', authMiddleware)
//-----------------------------------Get Requests------------------------------

app.get("/", homePageController)
app.get('/posts/new', authMiddleware, createPostController)
app.get("/post/:id", getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, createUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', redirectIfAuthenticatedMiddleware, logoutController)

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
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loggedInUserController)


app.listen(4000, () => {
    console.log('App is listening on port 4000.')
})