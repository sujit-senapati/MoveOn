import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AcceptRidePopup = (props) => {

    const [OTP, setOTP] = useState('')


    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div >
            <div className='flex items-center justify-between px-3 border-b-1 border-gray-200'>
                <h3 className='text-2xl font-semibold mb-5' >Confirm this ride?</h3>
                <h5 onClick={() => {
                    props.setAcceptRidePopupPanel(false);
                    props.setRidePopupPanel(true);
                }} className='mb-3 font-bold text-xl'><i className="ri-close-large-line"></i></h5>
            </div>

            {/* user details */}

            <div className='flex items-center justify-between mt-3 pb-3 border-b-1 border-gray-200'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
                    <h2 className='text-xl font-medium'>Jeff</h2>
                </div>
                <h5 className='font-medium'>2.2 KM</h5>
            </div>

            {/* ride details */}
            <div className='flex justify-between items-center flex-col'>
                <div className='w-full flex flex-col gap-4 mt-5 mb-5'>
                    <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                        <i className='ri-map-pin-3-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup location</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Assi Ghat Road, Maharashtra</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-1 border-b-1 border-gray-200'>
                        <i className='ri-square-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Drop location</h3>
                            <p className='text-gray-600 text-sm -mt-1'>4th cross road, SS circle, Maharashtra</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-1'>
                        <i className='ri-bank-card-fill text-xl'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Earnings</h3>
                            <p className='text-gray-600 text-sm -mt-1'>₹194</p>
                        </div>
                    </div>
                </div>
                <div className='fixed w-full bottom-0 flex flex-col justify-center items-end p-5 '>
                    <form onSubmit={() => {
                        submitHandler();
                    }}
                     className='w-full' action="">
                        <input value={OTP} onChange={(e) => {
                            setOTP(e.target.value);
                        }} className= 'rounded-sm font-mono w-full border-gray-200 border-1 text-center p-2 font-semibold' type="number" placeholder='Enter OTP'/>
                        <div className='w-full flex items-center justify-between'>
                            <button onClick={() => {
                            props.setAcceptRidePopupPanel(false);
                        }} className='w-2/5 mt-5 bg-white border-1 border-gray-300 active:bg-gray-300 font-semibold p-2 rounded-sm'>Cancel</button>
                        <Link to="/captain-riding" className='w-2/5 mt-5 text-center bg-black border-1 border-black active:bg-gray-800 text-white font-semibold p-2 rounded-sm'>Confirm</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AcceptRidePopup
