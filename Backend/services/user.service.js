const userModel = require('../models/user.model'); // Importing the user model



module.exports.createUser = async ({  // Create a new user in the database
    firstname, lastname, email, password,
}) =>  {
    if(!firstname || !email || !password) {
        throw new Error('All fields are required'); // check if all fields are provided
    }

    const user = userModel.create({ // create a new user using the user model
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    })

    return user; // return the created user
}