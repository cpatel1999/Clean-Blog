const path = require('path')
const expressEdge = require('express-edge')
const express = require('express')
const app = new express()

// const {config, expressEdge} = require('express-edge')

app.use(express.static('public'))
// app.use(expressEdge)
app.set('views', `${__dirname}/views`);

app.get("/", (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get("/about", (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get("/contact", (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get("/post", (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.listen(4000, () => {
    console.log('App is listening on port 4000.')
})