import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // importing browser router for routing
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext> {/* wrapping the app with user context to provide user data to all components */}
        <BrowserRouter> {/* wrapping the app with browser router to enable routing */}
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </StrictMode>,
)
