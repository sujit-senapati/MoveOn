import React, { useState } from 'react'
import { Link } from 'react-router-dom' // importing link from react router dom for routing
import { CaptainDataContext } from '../context/CaptainContext' // importing captain data context to provide captain data to all components
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // importing useNavigate from react router dom for routing

const CaptainSignup = () => {

  const navigate = useNavigate(); //using useNavigate hook to navigate to different pages

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = React.useContext(CaptainDataContext) //using user context to get user data

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent default behavior of form submission where page gets reloaded

    //setting userdata to the email and password entered by the user
    const captainData = ({
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData) //sending the data to the server using axios

    if(response.status === 201) {
      const data = response.data; //getting the data from the response
      setCaptain(data.captain); //setting the captain data to the captain context
      localStorage.setItem('token', data.token); //setting the token to the local storage
      navigate('/captain-home'); //navigating to the home page after successful login
    }


    //set firstname, lastname, email and password to empty string after form submission to empty the fields on the webpage
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');

  }

  return (
    <div className='px-7 py-1 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-16 mb-3' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e); //calling the submit handler function on form submission
        }} action="">

          <h3 className='text-lg mb-2 font-medium'>What's your name?</h3>
          <div className='flex gap-4 mb-3'>
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
            className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg mb-2 font-medium'>What'll be your password</h3>
          <input
            value={password}
            onChange={(e) => { //using use state to enter and update password on the webpage
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' required type="password" placeholder='password' />

          <h3 className='text-lg mb-2 font-medium'>Vehicle information</h3>
          <div className='flex gap-4 mb-4'>
            <input
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='vehicle color' />
            <input
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='license plate' />
          </div>
          <div className='flex gap-4 mb-5'>
            <input
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required type="number" placeholder='vehicle capacity' />
            <select
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value); //using use state to enter and update first name on the webpage
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' required placeholder='type' >
                <option value="" disabled>select vehicle type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
          </div>

          <button className='bg-[#111] mb-5 rounded px-4 py-2 border w-full text-white font-semibold placeholder:text-base'>Create Capatin Account</button>
          <div className='text-sm flex justify-center items-center flex-col'>
            <p className='text-center'>Already have an account?</p>
            <Link className='text-blue-600 p-0.5' to='/captain-login'>Login here</Link>
          </div>
        </form>

      </div>
      <div>
        <p className='text-[10px] leading-tight text-center mb-0.5'>By proceeding, you consent to get email messages, including by automated means, from Uber and its affiliates to the email provided</p>
      </div>

    </div>
  )
}

export default CaptainSignup
