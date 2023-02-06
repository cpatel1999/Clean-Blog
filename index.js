const path = require('path')
const express = require('express')
const { request } = require('http')
const { response } = require('express')

const app = new express()

app.use(express.static('public'))

app.get("/", (requst, response) => {
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
    console.log('App is listening on port 4000 :).')
})