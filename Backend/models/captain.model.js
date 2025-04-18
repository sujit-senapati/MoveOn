const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const captail = captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email is not valid'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        },
    },
})




captainSchema.methods.generateAuthToken = function() { //generate a jwt token for the captain
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password) { //compare the provided password with the hashed password in the database
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) { //hash the password before saving it to the database
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema);


module.exports = captainModel; //export the captain model