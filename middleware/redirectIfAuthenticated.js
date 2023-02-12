const User = require('../Database/models/User')

module.exports = (request, response, next) => {
    if(request.session.userId) {
        return response.redirect('/')
    }
    next()
}