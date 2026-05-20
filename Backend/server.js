const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Fallback: if dotenv didn't populate MONGO_URI (when process.cwd() differs), read .env directly
if (!process.env.MONGO_URI) {
    const fs = require('fs');
    const envPath = path.join(__dirname, '.env');
    try {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const m = envContent.match(/^MONGO_URI=(.*)$/m);
            if (m && m[1]) process.env.MONGO_URI = m[1].trim();
        }
    } catch (e) {
        // ignore
    }
}

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000; // Default port is 3000 if not specified in environment variables


const server = http.createServer(app); // Create an HTTP server using the Express app


server.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${port}`);
});