const path = require('path')

const Post = require('../Database/models/Post')

module.exports = (request, response) => {
    const { image } = request.files

    image.mv(path.resolve(__dirname, '..' ,'public/posts', image.name), (error) => {
        Post.create({
            ...request.body,
            image: `/posts/${image.name}`,
            author: request.session.userId
        }, (error, post) => {
            response.redirect('/')
        })
    })
}