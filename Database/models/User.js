const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide your username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide your email']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
    }
})

//Encrypt the user password
//Meaning is, execute the function before saving the password.
//This function is not a callback function, so we cannot use arrow function.
UserSchema.pre('save', function(next) {
    const user = this
    //Password and number of time to perform hashing/encryption
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

const User = mongoose.model('User', UserSchema)

module.exports = User