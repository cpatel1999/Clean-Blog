module.exports = (request, response) => {
    if(request.session.userId) {
        response.render('create')
    } else {
        response.redirect('/auth/login')
    }
}