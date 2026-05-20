import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MoveOnLogo from '../assets/logos/MoveOnLogo.png'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorMessageRef = useRef(null);


  const { user, setUser } = useContext(userDataContext) //using user context to get user data
  const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      // Success
      if (errorMessageRef.current) {
        errorMessageRef.current.textContent = "";
        errorMessageRef.current.style.color = "white";
      }

      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");

      //clear the input fields after successful attempt
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("Login error:", err.response?.status, err.response?.data);

      //showing error message when login fails
      if (errorMessageRef.current) {
        if (err.response?.status === 401) {
          errorMessageRef.current.textContent = "Wrong email or password";
          errorMessageRef.current.style.color = "red";
        } else if (err.response?.status === 400) {
          errorMessageRef.current.textContent =
            "Invalid email or password format";
          errorMessageRef.current.style.color = "red";
        } else {
          errorMessageRef.current.textContent =
            "Something went wrong. Try again!";
          errorMessageRef.current.style.color = "red";
        }
      }
    }
  };


  return (
    <div className='min-h-screen bg-slate-800 flex justify-center px-4 py-8'>

      <div className='w-full max-w-md bg-zinc-100 rounded-3xl shadow-xl p-8'>
        <img className='w-32 -mt-5 -ml-7' src={MoveOnLogo} alt="" />

        <form className='flex flex-col gap-5' onSubmit={(e) => {
          submitHandler(e); //calling the submit handler function on form submission
        }} action="">
          <h3 className='text-lg mb-2 font-medium'>Enter your email?</h3>
          <input
            value={email}
            onChange={(e) => { //using use state to enter and update email on the webpage
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg mb-2 font-medium'>Enter your password</h3>
          <input
            value={password}
            onChange={(e) => { //using use state to enter and update password on the webpage
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base' required type="password" placeholder='password' />
          <button className='bg-[#111] rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base active:scale-95'>Login</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p ref={errorMessageRef} className='text-white -mt-2'></p>
            <p className='text-center'>Don't have an account?</p><Link className='text-blue-600 p-0.5' to='/signup'>Sign up</Link>
          </div>
        </form>

        <Link
          to='/captain-login'
          className='bg-[#10b461] mb-5 flex items-center justify-center rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>
          Sign in as Captain
        </Link>
      </div>
      <div>
      </div>

    </div>
  )
}

export default UserLogin
