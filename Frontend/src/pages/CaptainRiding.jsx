import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import UberLogo from '../assets/logos/Uber-Logo-Icon.png'
import FinishRide from '../components/FinishRide'


const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)

  const finishRidePanelRef = useRef(null)

  // gsap animation for finish ride panel
  useGSAP(function() {
    if(finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        translateY: '0%',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        translateY: '100%',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-2 top-0 left-0 flex items-center justify-between w-screen'>
        <img className='h-16 w-16 p-2' src={UberLogo} alt="" />

      </div>

      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-5374933-2852463376184676745.jpg" alt="" />
      </div>

      <div className='border-t-1 border-t-gray-200 h-1/5 flex flex-col bg-white px-5 fixed bottom-0 w-full justify-end py-5'>
        <h4 className='text-xl text-center font-semibold '>2.1 KM away</h4>
        <button onClick={() => {
          setFinishRidePanel(true);
        }} className=' w-full mt-5 bg-black active:bg-gray-800 text-white font-semibold p-2 rounded-sm'>Complete ride</button>
      </div>

      <div>
        <div ref={finishRidePanelRef} className='h-screen fixed z-10 translate-y-full w-full bg-white bottom-0 px-3 py-6'>
          {/* ride popup panel */}
          <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>
      </div>

    </div>
  )
}

export default CaptainRiding
