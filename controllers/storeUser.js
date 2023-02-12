const User = require('../Database/models/User')

module.exports = (request, response) => {
    User.create(request.body, (error, user) => {
        response.redirect('/')
    })
}