import React, {useContext, useEffect} from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({
    children //children is a prop that is passed to the component which contains the child elements of the component
}) => {

    const token = localStorage.getItem('token'); //getting the token from the local storage
    const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

    useEffect(() => { //using useEffect hook to check if the user is logged in or not
        if(!token) {
            navigate('/login'); //if user is not logged in, navigate to login page
        }
    })

  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper
