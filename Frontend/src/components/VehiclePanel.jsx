import React from 'react'

import UberCar from '../assets/models/UberCar.png'
import UberMoto from '../assets/models/UberMoto.webp'
import UberAuto from '../assets/models/UberAuto.webp'

const VehiclePanel = (props) => {

    return (
        <div>
            <div className='flex items-center justify-between px-3'>
                <h3 className='text-2xl font-semibold mb-5' >Choose a Vehicle</h3>
                <h5 onClick={() => {
                    props.setVehiclePanel(false);
                }
                } className='mb-3 font-bold text-xl'><i className="ri-close-large-line"></i></h5>
            </div>
            <div 
            onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
            }}
            className='w-full border-2 border-gray-200 active:bg-gray-200 rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-15' src={UberCar} alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-lg' >UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='text-gray-600 text-xs font-normal'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹194</h2>
            </div>
            <div 
            onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
            }}
            className='w-full border-2 border-gray-200 active:bg-gray-200 rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-15' src={UberMoto} alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-lg' >UberMoto <span><i className="ri-user-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='text-gray-600 text-xs font-normal'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹100</h2>
            </div>
            <div 
            onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
            }}
            className='w-full border-2 border-gray-200 active:bg-gray-200 rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-15' src={UberAuto} alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-lg' >UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>5 mins away</h5>
                    <p className='text-gray-600 text-xs font-normal'>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹154</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
