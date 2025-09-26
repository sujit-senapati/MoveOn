const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const app = express();
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const connectToDb = require('./db/db'); // Database connection
const userRoutes = require('./routes/user.routes'); // User-related routes
const captainRoutes = require('./routes/captain.routes'); //captain-related routes
const findRoute = require('./routes/find.route'); // route for finding routes in the map for the rides

connectToDb(); // Connect to the database


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies from request headers



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRoutes); //user-related routes
app.use('/captains', captainRoutes); //captain-related routes
app.use('/ride', findRoute); //ride route finding route


module.exports = app;