import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext, { userDataContext } from '../context/UserContext'


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

  const { user, setUser } = useContext(userDataContext) //using user context to get user data

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent default behavior of form submission where page gets reloaded

    //setting userdata to the email and password entered by the user
    const newUser = ({
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data; //getting the data from the response

      setUser(data.user); //setting the user data to the user context
      localStorage.setItem('token', data.token); //setting the token to the local storage

      navigate('/home');
    }


    //set firstname, lastname, email and password to empty string after form submission to empty the fields on the webpage
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');

  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

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
          <button className='bg-[#111] mb-6 rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>Create Account</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p className='text-center'>Already have an account?</p><Link className='text-blue-600 p-0.5' to='/login'>Login here</Link>
          </div>
        </form>

      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get email messages, including by automated means, from Uber and its affiliates to the email provided</p>
      </div>

    </div>
  )
}

export default UserSignup
