import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userdata, setUserdata] = useState({});

  const submitHandler = (e) => {
    e.preventDefault(); //prevent default behavior of form submission where page gets reloaded

    //setting userdata to the email and password entered by the user
    setUserdata({
      email: email,
      password: password
    })

    //set email and password to empty string after form submission
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
          <button className='bg-[#111] mb-7 rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>Login</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p className='text-center'>Don't have an account?</p><Link className='text-blue-600 p-0.5' to='/signup'>Sign up</Link>
          </div>
        </form>

      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] mb-5 flex items-center justify-center rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>
          Sign in as Captain
        </Link>
      </div>

    </div>
  )
}

export default UserLogin
