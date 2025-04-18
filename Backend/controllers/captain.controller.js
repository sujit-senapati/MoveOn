const captainModel = require('../models/captain.model'); //importing the captain model
const captainService = require('../services/captain.service'); //importing the captain service
const { validationResult } = require('express-validator'); //importing express-validator for validation


module.exports.registerCaptain = async (req, res, next) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return a 400 response with the errors
    }

    const { fullname, email, password, vehicle } = req.body; //destructure the request body to get the captain details

    const isCaptainExists = await captainModel.findOne({ email }); //check if the captain already exists in the database using the email
    if(isCaptainExists) {
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