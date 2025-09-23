import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';

// This component protects routes by checking if the user is authenticated
const UserProtectedWrapper = ({ children }) => {
  const { user, setUser } = useContext(userDataContext); // Access user context
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return;
    }
    // Fetch user profile from backend to verify token
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // If successful, set user data in context
      setUser(res.data.user);
      setLoading(false); // Stop loading
    })
    .catch(() => {
      // If error (e.g., invalid token), remove token and redirect to login
      localStorage.removeItem('token');
      setLoading(false);
      navigate('/login');
    });
  }, [setUser, navigate]); // Run only once on mount

  // While loading, show a loading message
  if (loading) return <div>Loading...</div>;
  // If authenticated, render the protected children
  return <>{children}</>;
};

export default UserProtectedWrapper;
