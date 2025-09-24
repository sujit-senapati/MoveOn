import React, {useContext, useEffect, useState} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; // Importing axios to make API calls

const CaptainProtectedWrapper = ({
    children // children is a prop that contains the child elements of the component
}) => {

    const token = localStorage.getItem('token'); // Get the token from local storage
    const navigate = useNavigate(); // Hook to navigate between pages
    const { captain, setCaptain } = useContext(CaptainDataContext); // Get and set captain data from context
    const [ isLoading, setIsLoading ]= useState(true); // State to track loading status

    useEffect(() => {
        // If no token, redirect to captain login page
        if(!token) {
            navigate('/captain-login');
            return;
        }
        // Fetch captain profile only once when component mounts or token changes
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in request header
            }
        }).then(response => {
            if(response.status === 200) {
                setCaptain(response.data.captain); // Save captain data in context
                setIsLoading(false); // Stop loading
            }
        })
        .catch(err => {
            console.log(err); // Log any error
            localStorage.removeItem('token'); // Remove token if error occurs
            setIsLoading(false); // Stop loading
            navigate('/captain-login'); // Redirect to login page
        });
    }, [token, setCaptain, navigate]); // Only run when token, setCaptain, or navigate changes

    // Show loading message while fetching profile
    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // Render child components if authenticated
    return (
        <div>
            {children}
        </div>
    )
}

export default CaptainProtectedWrapper
