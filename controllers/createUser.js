module.exports = (request, response) => {
    response.render('register', {
        errors: request.flash('registrationErrors')
    })
}