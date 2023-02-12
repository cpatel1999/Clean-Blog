const Post = require('../Database/models/Post')

module.exports = async (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/post.html'))
    
    console.log(request.params) // Returns the object of parameters passed in the URL

    const post = await Post.findById(request.params.id).populate('author')

    // console.log(post)
    //If we use templating engine then render is used to render the template, instead of sendFile.
    response.render('post', {
        post : post
    })
}