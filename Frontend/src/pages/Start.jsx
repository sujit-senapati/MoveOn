import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  console.log('Home page loaded')
  return (
    <div>
      <div className='bg-cover bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png)] h-screen w-full flex justify-between flex-col pt-8'>
        <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get started with MoveOn</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 active:scale-95'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
