const { model } = require('mongoose');
const captainModel = require('../models/captain.model'); //importing the captain model
const captainService = require('../services/captain.service'); //importing the captain service
const { validationResult } = require('express-validator'); //importing express-validator for validation
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return a 400 response with the errors
    }

    const { fullname, email, password, vehicle } = req.body; //destructure the request body to get the captain details

    // Strong password validation
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long and include letters, numbers, and special characters."
        });
    }

    const isCaptainExists = await captainModel.findOne({ email }); //check if the captain already exists in the database using the email
    if (isCaptainExists) {
        return res.status(409).json({ message: 'Captain already exists' }); //if the captain already exists, return a 409 response with an error message
    }

    const hashedPassword = await captainModel.hashPassword(password); // Hash the password using the captain model's method

    const captain = await captainService.createCaptain({ //create a new captain using the captain service
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })

    const token = captain.generateAuthToken(); //generate a JWT token for the captain using the captain model's method

    res.status(201).json({ token, captain }); //return a 201 response with the token and captain details
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req); //validate the request body using express-validator
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() }); //if there are validation errors, return a 400 response with the errors
    }

    const { email, password } = req.body; //destructure the request body to get the email and password

    const captain = await captainModel.findOne({ email }).select('+password'); //find the captain in the database using the email and select password
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' }); //if the captain is not found, return a 401 response with an error message
    }

    const isMatch = await captain.comparePassword(password); //compare the provided password with the hashed password in the database using the captain model's method
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' }); //if the passwords do not match, return a 401 response with error message
    }

    const token = captain.generateAuthToken(); //generate a JWT token for the captain using the captain model's method

    res.cookie('token', token); //set the token in a cookie

    res.status(200).json({ token, captain }); //return a 200 response with the token and captain details
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain }); //return a 200 response with the captain details from the request object
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //get the token from cookies or headers

    await blacklistTokenModel.create({ token }); //create a new blacklist token in the database

    res.clearCookie('token'); //clear the token from the response cookies

    res.status(200).json({ message: 'Logged out successfully' }); //return a 200 response with success meassege
}