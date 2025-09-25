import React from 'react'

import UberCar from '../assets/models/UberCar.png'
import UberMoto from '../assets/models/UberMoto.webp'
import UberAuto from '../assets/models/UberAuto.webp'

const ConfirmRide = (props) => {
    return (
        <div>
            <div className='flex items-center justify-between px-3 border-b-1 border-gray-200'>
                <h3 className='text-2xl font-semibold mb-5' >Confirm your ride</h3>
                <h5 onClick={() => {
                    props.setConfirmRidePanel(false);
                }
                } className='mb-3 font-bold text-xl'><i className="ri-close-large-line"></i></h5>
            </div>

            <div className='flex justify-between items-center flex-col'>
                <img className='h-25 m-5' src={UberCar} alt="" />
                <div className='w-full flex flex-col gap-4 mt-5 mb-5'>
                    <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                        <i className='ri-map-pin-3-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>573-B</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Assi Ghat Road, Maharashtra</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                        <i className='ri-square-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                            <p className='text-gray-600 text-sm -mt-1'>4th cross road, SS circle, Maharashtra</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-1'>
                        <i className='ri-bank-card-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹194</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setSearchingDriverPanel(true);
                    props.setConfirmRidePanel(false);
                }} className='w-full mt-5 bg-black active:bg-gray-800 text-white font-semibold p-2 rounded-sm active:scale-95'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide
