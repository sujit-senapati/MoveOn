import React, { useState, useRef, use } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

import UberLogo from '../assets/logos/Uber-Logo.png'

import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { Link } from 'react-router-dom'



const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [searchingDriverPanel, setSearchingDriverPanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)


  const panelRef = useRef(null)
  const arrowRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const searchingDriverPanelRef = useRef(null)
  const waitingForDriverPanelRef = useRef(null)
  const logAndLogoutRef = useRef(null)


  const submitHander = (e) => {
    e.preventDefault();
    ////
  }

  // gsap animation for location panel
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        ease: 'power3.out',
        duration: 0.5,
        padding: 24
      })
      gsap.to(arrowRef.current, {
        ease: 'power3.out',
        duration: 0.5,
        rotation: 180,
        transformOrigin: '50% 50%'
      })
      gsap.to(logAndLogoutRef.current, {
        display: 'none',
        ease: 'power3.out',
        duration: 0.25
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        ease: 'power3.out',
        duration: 0.5,
        padding: 0
      })
      gsap.to(arrowRef.current, {
        ease: 'power3.out',
        duration: 0.5,
        rotation: 0,
        transformOrigin: '50% 50%'
      })
      gsap.to(logAndLogoutRef.current, {
        display: 'flex',
        ease: 'power3.out',
        duration: 0.25
      })
    }

  }, [panelOpen])

  // gsap animation for vehicle panel
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [vehiclePanel])

  // gsap animation for confirm ride panel
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [confirmRidePanel])

  // gsap animation for searching driver panel
  useGSAP(function () {
    if (searchingDriverPanel) {
      gsap.to(searchingDriverPanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(searchingDriverPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [searchingDriverPanel])

  // gsap animation for waiting for driver panel
  useGSAP(function () {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(0%)',
        ease: 'power3.out',
        duration: 0.5
      })
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.out',
        duration: 0.5
      })
    }
  }, [waitingForDriverPanel])

  return (

    <div className='h-screen relative overflow-hidden'>
      <div ref={logAndLogoutRef} className='fixed p-2 z-30 top-0 left-0 flex items-center justify-between w-screen'>
        <img className='w-16 absolute left-5 top-5' src={UberLogo} alt="" />
        <Link to="/user/logout" className='h-10 w-10 bg-white flex items-center justify-center fixed right-4 top-5 rounded-sm'>
          <i className="ri-logout-box-r-line font-medium text-lg"></i>
        </Link>
      </div>

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-5374933-2852463376184676745.jpg" alt="" />
      </div>

      {/* location search panel */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5
            ref={arrowRef}
            onClick={() => {
              setPanelOpen(!panelOpen);
            }}
            className='absolute top-8 right-6.5 text-2xl'>
            <i className="ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHander(e);
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      {/* vehicle selection panel */}
      <div ref={vehiclePanelRef} className='fixed translate-y-full z-10 w-full bg-white bottom-0 px-3 py-6'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      {/* confirm ride panel */}
      <div ref={confirmRidePanelRef} className='fixed translate-y-full z-10 w-full bg-white bottom-0 px-3 py-6'>
        <ConfirmRide setSearchingDriverPanel={setSearchingDriverPanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      {/* searching driver panel */}
      <div ref={searchingDriverPanelRef} className='fixed translate-y-full z-10 w-full bg-white bottom-0 px-3 py-6'>
        <LookingForDriver setSearchingDriverPanel={setSearchingDriverPanel} setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
      {/* waiting for driver panel */}
      <div ref={waitingForDriverPanelRef} className='fixed translate-y-full z-10 w-full bg-white bottom-0 px-3 py-6'>
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home
