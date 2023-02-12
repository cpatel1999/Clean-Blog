const Post = require('../Database/models/Post')

module.exports = async (request, response) => {
    const posts = await Post.find({})
    // response.sendFile(path.resolve(__dirname, 'pages/index.html'))
    // console.log(posts)
    // If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('index', {
        posts : posts
    })
}