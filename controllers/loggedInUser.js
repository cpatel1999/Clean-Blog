const User = require('../Database/models/User')
const bcrypt = require('bcrypt')

module.exports = (request, response) => {

    const { email, password } = request.body
    User.findOne({
        email: email
    }, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    //Store user session
                    response.redirect('/')
                } else {
                    response.redirect('/auth/login')
                }
            })
        } else {
            response.redirect('/auth/login')
        }
    })
    
}