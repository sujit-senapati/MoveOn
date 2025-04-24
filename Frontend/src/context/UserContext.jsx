import React, { createContext } from 'react'
import { useState } from 'react' // importing useState hook from react

export const userDataContext = createContext(); // creating a context for user data

const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: ''
    })

    return (
        <div>
            <userDataContext.Provider value={{ user, setUser }}> {/* this is used to provide user data to all components */}
                {children} {/* this is used to wrap the app with user context to provide user data to all components */}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext // exporting user context to use it in other components
