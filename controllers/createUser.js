module.exports = (request, response) => {
    console.log(request.flash('data')[0])
    response.render('register', {
        errors: request.flash('registrationErrors'),
        data: request.flash('data')[0]
    })
}