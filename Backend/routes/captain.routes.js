const captainController = require('../controllers/captain.controller');
const express = require('express'); //importing express
const router = express.Router(); //creating a new router instance
const { body } = require('express-validator'); //importing express-validator for validation
const authMiddleware = require('../middlewares/auth.middleware'); //importing auth middleware


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'), //validate email format
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), //validate first name length
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), //validate password length
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'), //validate vehicle color length
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'), //validate vehicle plate length
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'), //validate vehicle capacity
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be either car, motorcycle or auto'), //validate vehicle type
],
    captainController.registerCaptain //register captain route)
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'), //validate email format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), //validate password length
],
    captainController.loginCaptain //login captain route
)

router.get('/profile', authMiddleware.authCaptain , captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); //logout captain route


module.exports = router; //exporting the router instance