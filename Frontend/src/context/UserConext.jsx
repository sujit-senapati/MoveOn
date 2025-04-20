import React, { createContext } from 'react'

export const userDataContext = createContext(); // creating a context for user data

const UserConext = ({ children }) => {

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
            <userDataContext.Provider value={[user, setUser]}>
                {children} {/* this is used to wrap the app with user context to provide user data to all components */}
            </userDataContext.Provider>
        </div>
    )
}

export default UserConext
