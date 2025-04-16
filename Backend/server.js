const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000; // Default port is 3000 if not specified in environment variables


const server = http.createServer(app); // Create an HTTP server using the Express app


server.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${port}`);
});