const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const app = express();
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const connectToDb = require('./db/db'); // Database connection
const userRoutes = require('./routes/user.routes'); // User-related routes
const captainRoutes = require('./routes/captain.routes'); //captain-related routes
const findRoute = require('./routes/find.route'); // route for finding routes in the map for the rides

connectToDb(); // Connect to the database

const allowedOrigins = [
    "http://localhost:5173",
    "https://move-on-nine.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies from request headers



app.get('/', (req, res) => {
    res.send('Hello World');
})

// ==========================================
// 🟢 PUBLIC HEALTH CHECK ENDPOINT FOR CRON JOB
// ==========================================
app.get('/api/heartbeat', (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.use('/users', userRoutes); //user-related routes
app.use('/captains', captainRoutes); //captain-related routes
app.use('/ride', findRoute); //ride route finding route


module.exports = app;