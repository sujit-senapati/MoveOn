import React, {useContext, useEffect, useState} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; //importing axios to make API calls

const CaptainProtectedWrapper = ({
    children //children is a prop that is passed to the component which contains the child elements of the component
}) => {

    const token = localStorage.getItem('token'); //getting the token from the local storage
    const navigate = useNavigate(); //using useNavigate hook to navigate to different pages
    const { captain, setCaptain } = useContext(CaptainDataContext); //using context to get and set captain data
    const [ isLoading, setIsLoading ]= useState(true); //using state to get and set loading state

    useEffect(() => { //using useEffect hook to check if the captain is logged in or not
        if(!token) {
            navigate('/captain-login'); //if captain is not logged in, navigate to login page
        }
    }, [ token ])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}` //sending the token in the header of the request to get captain profile
        }
    }).then(response => {
        if(response.status === 200) {
            setCaptain(response.data.captain); //setting the captain data in the context
            setIsLoading(false); //setting loading state to false after getting captain profile
        }
    })
    .catch(err => {
        console.log(err);
        localStorage.removeItem('token'); //removing the token from local storage if there is an error
        navigate('/captain-login'); //if there is an error, navigate to login page
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

export default CaptainProtectedWrapper
