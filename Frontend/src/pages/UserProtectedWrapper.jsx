import React, {useContext, useEffect, useState} from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; //importing axios to make API calls

const UserProtectedWrapper = ({
    children //children is a prop that is passed to the component which contains the child elements of the component
}) => {

    const token = localStorage.getItem('token'); //getting the token from the local storage
    const navigate = useNavigate(); //using useNavigate hook to navigate to different pages
    const { user, setUser } = useContext(userDataContext); //using context to get and set user data
    const [ isLoading, setIsLoasing ] = useState(true); //using state to manage Loading state

    useEffect(() => { //using useEffect hook to check if the user is logged in or not
        if(!token) {
            navigate('/login'); //if user is not logged in, navigate to login page
        }
    }, [ token ]) 

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}` //sending the token in the header of the request to get user profile
        }
    }).then(response => {
        if(response.status === 200) {
            setUser(response.data.user); //setting the user data in the context
            setIsLoasing(false); //setting loading state to false after getting user profile
        }
    }) 
    .catch(err => {
        console.log(err);
        localStorage.removeItem('token'); //removing the token from local storage if there is an error
        navigate('/login'); //if there is an error, navigate to login page
    })
    
    if(isLoading) {
      return (
        <div>Loading...</div>
      )
    }

  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper
