import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import UberLogo from '../assets/logos/Uber-Logo-Icon.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AcceptRidePopup from '../components/AcceptRidePopup'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true); // State to control visibility of ride popup panel
  const [acceptRidePopupPanel, setAcceptRidePopupPanel] = useState(false); // State to control visibility of accept ride popup panel

  const ridePopupPanelRef = useRef(null)
  const acceptRidePopupPanelRef = useRef(null)


  // gsap animation for ride popup panel
   useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [ridePopupPanel])

  // gsap animation for accept ride popup panel
     useGSAP(function () {
    if (acceptRidePopupPanel) {
      gsap.to(acceptRidePopupPanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(acceptRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [acceptRidePopupPanel])


  return (
    <div className='h-screen'>
      <div className='fixed p-2 top-0 left-0 flex items-center justify-between w-screen'>
        <img className='h-16 w-16 p-2' src={UberLogo} alt="" />
        <Link to="/user/logout" className='h-10 w-10 bg-white flex items-center justify-center fixed right-4 top-5 rounded-sm'>
          <i className="ri-logout-box-r-line font-medium text-lg"></i>
        </Link>
      </div>

      <div className='h-2/3'>
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-5374933-2852463376184676745.jpg" alt="" />
      </div>

      <div>
        <div className=''>
          {/* captain details panel */}
          <CaptainDetails />
        </div>

        <div ref={ridePopupPanelRef} className='fixed z-10 translate-y-full w-full bg-white bottom-0 px-3 py-6'>
          {/* ride popup panel */}
          <RidePopUp setRidePopupPanel={setRidePopupPanel} setAcceptRidePopupPanel={setAcceptRidePopupPanel}/>
        </div>

        <div ref={acceptRidePopupPanelRef} className='h-screen fixed z-10 translate-y-full w-full bg-white bottom-0 px-3 py-6'>
          {/* ride popup panel */}
          <AcceptRidePopup setAcceptRidePopupPanel={setAcceptRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>

      </div>
    </div>
  )
}

export default CaptainHome
