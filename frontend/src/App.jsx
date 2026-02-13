import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/Verify'
import Navbar from './Components/Navbar'
import ProtectedRoute from './Components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'

const router =createBrowserRouter([
  {
    path: '/',
    element: 
    <>
    <ProtectedRoute>
      <Navbar/> <Home />
    </ProtectedRoute>
    </> 
  },
  
  {
    path: '/signup',
    element: <Signup />
  },
  
  {
    path: '/verify',
    element: <VerifyEmail />
  },
  {
    path: '/verify/:token',
    element: <Verify />
  },
  {
    path: '/login',element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },
   {
    path: '/verify-otp/:email',
    element: <VerifyOTP/>
  }


])
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App