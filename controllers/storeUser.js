const User = require('../Database/models/User')

module.exports = (request, response) => {
    User.create(request.body, (error, user) => {
        if(error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            //Connect flash is used to set the errors for the next request life cycle only.
            //It will flush the session info at the end of the next request.
            //Here, next request is response.redirect('/auth/register').
            //So, it will persist for that request life cycle only.
            request.flash('registrationErrors', registrationErrors) 
            request.flash('data', request.body)
            return response.redirect('/auth/register')
        }
        response.redirect('/')
    })
}