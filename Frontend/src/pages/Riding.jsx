import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to="/home" className='h-10 w-10 bg-white flex items-center justify-center fixed right-2 top-2 rounded-sm'>
                <i className="ri-home-9-fill font-medium text-lg"></i>
            </Link>

            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-5374933-2852463376184676745.jpg" alt="" />
            </div>

            <div className='h-1/2 bg-white px-5 fixed bottom-0 w-full'>
                <div className='h-full'>
                    <h5 className='p-0 text-center w-[93%] absolute top-0'>
                    </h5>
                    
                    <div className='flex justify-between items-center flex-col'>
                        <div className='flex gap-20 items-center justify-center mt-5 mb-2 border-b-1 border-gray-200 pb-3'>
                            <div className='h-18 w-18 flex items-center justify-center rounded-full overflow-hidden border-none'>
                                <img className='' src="https://upload.wikimedia.org/wikipedia/commons/3/32/The_CEO%2C_UBER%2C_Mr._Travis_Kalanick_meeting_the_Union_Minister_for_Electronics_%26_Information_Technology_and_Law_%26_Justice%2C_Shri_Ravi_Shankar_Prasad%2C_in_New_Delhi_on_December_15%2C_2016_%28cropped%29.jpg" alt="" />
                            </div>
                            <div className='text-right'>
                                <h2 className='font-medium'>Travis</h2>
                                <h4 className='font-semibold'>WB 50 WW 5050</h4>
                                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col mt-1'>
                            <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                                <i className='ri-map-pin-3-fill text-xl'></i>
                                <div>
                                    <h3 className='font-medium'>573-B</h3>
                                    <p className='text-gray-600 text-sm -mt-1'>Assi Ghat Road, Maharashtra</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                                <i className='ri-square-fill text-xl'></i>
                                <div>
                                    <h3 className='font-medium'>Third Wave Coffee</h3>
                                    <p className='text-gray-600 text-sm -mt-1'>4th cross road, SS circle, Maharashtra</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 p-1'>
                                <i className='ri-bank-card-fill text-xl'></i>
                                <div>
                                    <h3 className='font-medium'>₹194</h3>
                                    <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => {
                        }} className='w-full mt-5 bg-black active:bg-gray-800 text-white font-semibold p-2 rounded-sm'>Make payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding
