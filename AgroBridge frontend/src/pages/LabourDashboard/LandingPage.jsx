import React from 'react'
import Navbar from '../../Components/Navbar'
import HeroSection from '../../Components/HeroSection'
import { BrowserRouter } from "react-router-dom" 
import FarmerHome from '../../pages/FarmerDashboard/FarmerHome'
import AdminDashboard from '../AdminDashboard/AdminDashboardLayout'

const LandingPage = () => {
  return (
    <div>
        <Navbar />        
        <HeroSection />   
        {/* <FarmerHome />    */}
        {/* <AdminDashboard /> */}
    </div>
  )
}

export default LandingPage