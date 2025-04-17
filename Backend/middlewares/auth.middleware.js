const userModel = require('../models/user.model'); //importing user model
const bcrypt = require('bcrypt'); //importing for password hashing
const jwt = require('jsonwebtoken'); //importing for JWT token generation



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]; //get the toke from cookies of headers
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' }); //if token is not present, return 401 response with error message
    }

    const isBlacklisted = await userModel.findOne({ token: token }); //check if the token is blacklisted in the database
    if(isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' }); //if token is blacklisted, return 401 response with error message
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the toke using JWT secret
        const user = await userModel.findById(decoded._id); //find the user in the database using the decoded token id

        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' }); //if user is not found, then return 401 response with error message
        }

        req.user = user; //set the user in the request object
        return next(); //call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' }); //if token is invalid, return 401 response with error message
    }
}