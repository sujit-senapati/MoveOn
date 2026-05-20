import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { useRef } from 'react';

import MoveOnLogo from '../assets/logos/MoveOnLogo.png'

const CaptainLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorMessageRef = useRef(null);

  const { captain, setCaptain } = React.useContext(CaptainDataContext); //using context to get and set captain data
  const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent default behavior of form submission where page gets reloaded

    //setting captaindata to the email and password entered by the user
    const captain = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain); //making a post request to the backend to login the captain

      if (response.status === 200) {
        const data = response.data; //getting the data from the response

        setCaptain(data.captain); //setting the captain data in the context
        localStorage.setItem('token', data.token); //storing the token in the local storage
        navigate('/captain-home'); //navigating to the captain home page after successful login
      }
    } catch (err) {
      if (errorMessageRef) {
        if (err.response?.status === 401) {
          errorMessageRef.current.useContext = 'Invalid email or password!';
          errorMessageRef.current.style.color = 'red';

          return;
        } else {
          errorMessageRef.current.style.color = 'white'; //make it invisible
        }
      }
    }

    //set email and password to empty string after form submission
    setEmail('');
    setPassword('');

  }


  return (
    <div className='min-h-screen bg-slate-800 flex justify-center px-4 py-8'>

      <div className='w-full max-w-md bg-zinc-100 rounded-3xl shadow-xl p-8'>
        <img className='w-32 -mt-5 -ml-7' src={MoveOnLogo} alt="" />

        <form onSubmit={(e) => {
          submitHandler(e); //calling the submit handler function on form submission
        }} action="">
          <h3 className='text-lg mb-2 font-medium'>Enter your email?</h3>
          <input
            value={email}
            onChange={(e) => { //using use state to enter and update email on the webpage
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg mb-2 font-medium'>Enter your password</h3>
          <input
            value={password}
            onChange={(e) => { //using use state to enter and update password on the webpage
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' required type="password" placeholder='password' />
          <button className='bg-[#111] mb-7 rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base active:scale-95'>Login</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p ref={errorMessageRef} className='text-white -mt-2'></p>
            <p className='text-center'>Don't have an account?</p>
            <Link className='text-blue-600 p-0.5' to='/captain-signup'>Register as a Captain</Link>
          </div>
        </form>

        <div>
          <Link
            to='/login'
            className='bg-[#d5622d] mb-5 flex items-center justify-center rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>
            Sign in as User
          </Link>
        </div>
      </div>

    </div>
  )
}

export default CaptainLogin
