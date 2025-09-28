const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');




module.exports.registerUser = async (req, res, next) => {
   const errors = validationResult(req); // Validate the request body using express-validator
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return a 400 response with the errors
   }

   const { fullname, email, password } = req.body; // destructure the request body to get the user details

   // Strong password validation
   const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
         message: "Password must be at least 8 characters long and include letters, numbers, and special characters."
      });
   }

   const isUserExists = await userModel.findOne({ email }); // Check if the user already exists in the database using the email
   if (isUserExists) {
      return res.status(409).json({ message: 'User already exists' }); // If the user already exists, return a 409 response with an error message
   }

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



module.exports.loginUser = async (req, res, next) => {
   const errors = validationResult(req); //validate the request body using express-validator
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are validation errors, return a 400 response with the errors
   }

   const { email, password } = req.body; //destructure the request body to get the user details
   const user = await userModel.findOne({ email }).select('+password'); //find the user in the database using the email and select the password field
   if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' }); //if the user is not found, return a 401 response with an error message
   }

   const isMatch = await user.comparePassword(password); //compare the provided password with the hashed password in the database
   if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' }); //if the passwords don't match, return a 401 response with an error message
   }

   const token = user.generateAuthToken(); //generate a JWT token for the user using the user model's method

   res.cookie('token', token); //set the token in the response cookies

   res.status(200).json({ token, user }); //return a 200 response with the token and user details
}


module.exports.getUserProfile = async (req, res, next) => {
   res.status(200).json({ user: req.user }); //return a 200 response with the user details from the request object
}


module.exports.logoutUser = async (req, res, next) => {
   res.clearCookie('token'); //clear the token from the response cookies

   const token = req.cookies.token || req.headers.authorization.split(' ')[1]; //get the token from cookies or headers

   await blacklistTokenModel.create({ token }); //create a new blacklist token in the database

   res.status(200).json({ message: 'Logged out successfully' }); //return a 200 response with a success message
}