import React from 'react'
import FarmerHome from './FarmerHome'
import FarmerSidebar from './FarmerSidebar'
import NewJob from './NewJob'
import {Routes, Route} from 'react-router-dom'
import FarmerDashboardRoutes from './FarmerDashboardRoutes'
import { FarmerHeader } from './FarmerHeader'
import AIWidget from '../../Components/AI/AIWidget'
const FarmerDashboardLayout = () => {
  return (
    <div>
        <FarmerHeader />
        <div className='d-flex flex-row'>
            <FarmerSidebar />
            <main>
            <FarmerDashboardRoutes />
            <AIWidget />
            </main>
            

        </div>
       
    </div>
  )
}

export default FarmerDashboardLayout