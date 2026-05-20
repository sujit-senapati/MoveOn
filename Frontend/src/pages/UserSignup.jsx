import React, { useContext, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext, { userDataContext } from '../context/UserContext'

import MoveOnLogo from '../assets/logos/MoveOnLogo.png'


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, seConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const errorMessageRef = useRef(null);

  const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

  const { user, setUser } = useContext(userDataContext) //using user context to get user data

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //for strong passwords

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent default behavior of form submission where page gets reloaded

    //check if passwords match
    if (password != confirmPassword) {
      if (errorMessageRef) {
        errorMessageRef.current.textContent = "Passwords do not match";
        errorMessageRef.current.style.color = 'red'; //make error message visible
      }

      return;
    } else {
      if (errorMessageRef) {
        errorMessageRef.current.style.color = 'white'; //make error message invisible
      }
    }

    //checking if password is strong
    if (!passwordRegex.test(password)) {
      if (errorMessageRef) {
        errorMessageRef.current.textContent =
          "Password must be at least 8 characters long and include letters, numbers, and special characters.";
        errorMessageRef.current.style.color = "red";
      }
      return; // stop the signup attempt
    } else {
      if (errorMessageRef) {
        errorMessageRef.current.style.color = 'white'; //make error message invisible
      }
    }

    //setting userdata to the email and password entered by the user
    const newUser = ({
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data; //getting the data from the response

        setUser(data.user); //setting the user data to the user context
        localStorage.setItem('token', data.token); //setting the token to the local storage

        navigate('/home');

      }
    } catch (err) {
      if (errorMessageRef) {
        if (err.response?.status === 400) {
          errorMessageRef.current.textContent = "Invalid format. Please try again!";
          errorMessageRef.current.style.color = "red";

          return;
        } else if (err.response?.status === 409) {
          errorMessageRef.current.textContent = "A user with the same email ID already exists!";
          errorMessageRef.current.style.color = "red";

          return;
        }
      }
    }

    //set firstname, lastname, email and password to empty string after form submission to empty the fields on the webpage
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    seConfirmPassword('');
  }


  return (
    <div className='min-h-screen bg-slate-800 flex justify-center px-4 py-8'>

      <div className='w-full max-w-md bg-zinc-100 rounded-3xl shadow-xl p-8'>
        <img className='w-32 -mt-5 -ml-7' src={MoveOnLogo} alt="" />

        <form onSubmit={(e) => {
          submitHandler(e); //calling the submit handler function on form submission
        }} action="">

          <h3 className='text-lg mb-2 font-medium'>What's your name?</h3>
          <div className='flex gap-4 mb-6'>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='Your firstname' />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='Your lastname' />
          </div>

          <h3 className='text-lg mb-2 font-medium'>What's your email?</h3>
          <input
            value={email}
            onChange={(e) => { //using use state to enter and update email on the webpage
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg mb-2 font-medium'>What'll be your password</h3>
          <input
            value={password}
            onChange={(e) => { //using use state to enter and update password on the webpage
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text-lg placeholder:text-base' required type="password" placeholder='password' />
          <h3 className='text-lg mb-2 font-medium'>Confirm password</h3>
          <input
            value={confirmPassword}
            onChange={(e) => { //using use state to enter and update password on the webpage
              seConfirmPassword(e.target.value);
            }}
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text-lg placeholder:text-base' required type="password" placeholder='password' />
          <button className='bg-[#111] mb-6 rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base active:scale-95'>Create Account</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p ref={errorMessageRef} className='text-white -mt-2'>Passwords do not match</p>
            <p className='text-center'>Already have an account?</p><Link className='text-blue-600 p-0.5' to='/login'>Login here</Link>
          </div>
        </form>

        <div>
          <p className='text-[10px] leading-tight text-center'>By proceeding, you consent to get email messages, including by automated means, from MoveOn to the email provided</p>
        </div>
      </div>

    </div>
  )
}

export default UserSignup
