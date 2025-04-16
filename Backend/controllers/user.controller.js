const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');




module.exports.registerUser = async(req, res, next) => {
     const errors = validationResult(req); // Validate the request body using express-validator
     if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()}); // If there are validation errors, return a 400 response with the errors
     }

     const { fullname, email, password } = req.body; // destructure the request body to get the user details

     const hashedPassword = await userModel.hashPassword(password); // Hash the password using the user model's method

     const user = await userService.createUser({ //create a new user using the user service
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
     })

     const token = user.generateAuthToken(); // generate a JWT token for the user using the user model's method


     res.status(201).json({ token, user }); // return a 201 response with the token and user details
}