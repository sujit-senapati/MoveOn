import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const token = localStorage.getItem('token'); //getting the token from the local storage
    const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: 'Bearer ' + token //sending the token in the header of the request to logout the user
        }
    }).then((response) => {
        navigate('/login'); //navigating to the login page after successful logout
    })

  return (
    <div>
      
    </div>
  )
}

export default UserLogout
