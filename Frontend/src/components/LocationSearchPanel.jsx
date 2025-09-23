import React from 'react'

const LocationSearchPanel = (props) => {

    //sample array of locations
    const locations = [
        "24B, Near Bustand, Daspur, West Bengal",
        "56A, Near Mall, Kolkata, West Bengal",
        "12C, Near Park Street, Kolkata, West Bengal",
        "78D, Near Airport, Kolkata, West Bengal",
        "90E, Near Station, Howrah, West Bengal"
    ]


  return (
    <div className='flex flex-col gap-2'>
        {/* this is just a sample data */}

        {
            locations.map(function(elem, idx){
                return (<div key={idx} onClick={() => {
                    props.setVehiclePanel(true);
                    props.setPanelOpen(false);
                }} className='flex border-2 border-gray-200 gap-4 active:bg-gray-200 rounded-xl p-2 justify-start items-center'>
            <h2 className='bg-[#eee] h-10 w-13 flex items-center justify-center rounded-full ml-2'>
                <i className="ri-map-pin-2-fill"></i>
            </h2>
            <h4 className='font-medium text-[#6e6e6e]'>{elem}</h4>
        </div>)
            })
        }

    </div>
  )
}

export default LocationSearchPanel
