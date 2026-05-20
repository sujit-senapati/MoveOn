import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserConext, { userDataContext } from './context/UserContext'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {


  return (
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/riding' element={<Riding />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/captain-signup' element={<CaptainSignup />} />
          <Route path='/captain-riding' element={<CaptainRiding />} />
          <Route path='/home'
            element={
              <UserProtectedWrapper>
                <Home />  {/* wrapping the home page with user protected wrapper to protect the route */}
              </UserProtectedWrapper>
            } />
          <Route path='/user/logout'
            element={
              <UserProtectedWrapper>
                <UserLogout /> {/* wrapping the user logout page with user protected wrapper to protect the route */}
              </UserProtectedWrapper>
            } />
          <Route path='/captain-home' element={
            <CaptainProtectedWrapper>
              <CaptainHome /> {/* wrapping the captain home page with captain protected wrapper to protect the route */}
            </CaptainProtectedWrapper>
          } /> {/* captain home page */}
          <Route path='/captain/logout'
            element={
              <CaptainProtectedWrapper>
                <CaptainLogout /> {/* wrapping the user logout page with user protected wrapper to protect the route */}
              </CaptainProtectedWrapper>
            } />
        </Routes>
  )
}

export default App
