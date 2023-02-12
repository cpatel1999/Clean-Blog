const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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