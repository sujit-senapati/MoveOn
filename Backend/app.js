const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const app = express();
const connectToDb = require('./db/db'); // Database connection
const userRoutes = require('./routes/user.routes'); // User-related routes

connectToDb(); // Connect to the database


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRoutes); //user-related routes


module.exports = app;