import React from 'react'
import { Link } from 'react-router-dom'

import MoveOnLogo from '../assets/logos/MoveOnLogo.png'

const Start = () => {
  console.log('Home page loaded')
  return (
    <div className='min-h-screen bg-slate-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-zinc-100 rounded-3xl shadow-xl overflow-hidden'>
        <div className='bg-cover bg-center min-h-[90vh] w-full flex justify-between flex-col pt-8'>
          <img className='w-32 -mt-5' src={MoveOnLogo} alt="" />
          <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get started with MoveOn</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 active:scale-95'>Continue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
