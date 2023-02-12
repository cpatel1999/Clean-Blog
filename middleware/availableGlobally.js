const edge = require('edge.js')

module.exports = (request, response, next) => {
    edge.global('auth', request.session.userId)
    next()
}