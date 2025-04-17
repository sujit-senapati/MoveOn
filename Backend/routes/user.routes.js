const express = require('express');
const router = express.Router(); // Creating a new router instance for user-related routes
const { body } = require('express-validator'); // Importing express-validator for validation
const userController = require('../controllers/user.controller'); // Importing the user controller



router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'), // Validate email format
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), // Validate first name length
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Validate password length
],
    userController.registerUser  // Register user route
);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'), //validate email
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), //validate password
],
    userController.loginUser //login user route
)


module.exports = router;