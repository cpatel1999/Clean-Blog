module.exports = (request, response) => {

    //Destroys all the information stored in the session
    request.session.destroy(() => {
        response.redirect('/')
    })
}