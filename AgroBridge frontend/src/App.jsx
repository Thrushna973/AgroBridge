import React from 'react'


import LabourersRegister from './Components/LabourersRegister'
import EmployersRegister from './Components/EmployersRegister'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import LabourLogin from './Components/Login'
import LabourHome from './pages/LabourDashboard/LabourHome'
import LandingPage from './pages/LabourDashboard/LandingPage'
import LabourDashboard from './pages/LabourDashboard/LabourDashboardLayout'
import FarmerDashboard from './pages/FarmerDashboard/FarmerDashboardLayout'
import FarmerSidebar from './pages/FarmerDashboard/FarmerSidebar'
import NewJob from './pages/FarmerDashboard/NewJob'
import AdminHome from './pages/AdminDashboard/AdminHome'
import AdminDashboard from './pages/AdminDashboard/AdminDashboardLayout'
import Farmers from './pages/AdminDashboard/InternalPages/Framers'
import Labourers from './pages/AdminDashboard/InternalPages/Labourers'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/labour-home/*" element={<LabourDashboard />} />
        <Route path='/farmer-home/*' element={<FarmerDashboard />} />
        <Route path='/admin-home/*' element={<AdminDashboard />} />
        {/* <Route path="/home/*" element = {<FarmerDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App