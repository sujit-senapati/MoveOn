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

const App = () => {


  return (
    <div>
      <Routes> 
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
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
        <Route path='/captain-home' element={<CaptainHome />} /> {/* captain home page */}
      </Routes>
    </div>
  )
}

export default App
