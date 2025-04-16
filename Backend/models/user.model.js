const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenth: [3, 'First name must be atleast 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'Email must be atleast 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = function() { // Generate a JWT token for the user
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) { // Compare the provided password with the hashed password in the database
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) { // Hash the password before saving it to the database
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema); // Create a model based on the user schema



module.exports = userModel;