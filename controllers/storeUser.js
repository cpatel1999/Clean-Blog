const User = require('../Database/models/User')

module.exports = (request, response) => {
    User.create(request.body, (error, user) => {
        if(error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            //Connect flash is used to set the errors for the one request life cycle only.
            //It will flush the session info at the end of the request.
            request.flash('registrationErrors', registrationErrors) 
            return response.redirect('/auth/register')
        }
        response.redirect('/')
    })
}