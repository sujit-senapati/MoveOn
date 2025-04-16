const mongoose = require('mongoose'); // Importing mongoose to interact with MongoDB


function connectToDb() { 
    mongoose.connect(process.env.DB_CONNECT).then( () => { // Connect to the database using the connection string from environment variables
        console.log('Connected to DB');
    }).catch(err => console.log(err)); // Log any errors that occur during the connection process
}

module.exports = connectToDb;