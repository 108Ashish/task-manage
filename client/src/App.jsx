import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Ragister from './pages/Ragister'  // Changed Register to Ragister to match the file name
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useNavigate } from 'react-router-dom'
const App = () => {
  const navigate = useNavigate();

useEffect(() => {
  if (localStorage.getItem("userLoggedIn")) {
    navigate("/dashboard");
  } else {
    navigate("/login");
  }
}, []);

  return (
    <>
    <Routes>
    <Route path="/" element={<Ragister />} /> 
    <Route path="/login" element={<Login />} /> 
    <Route path="/dashboard" element={<Dashboard />} />
    {/* You can replace Ragister with the actual Login component when you create it */}
    </Routes>
    </>
  )
}

export default App