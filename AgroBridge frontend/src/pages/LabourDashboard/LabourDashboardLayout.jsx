import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Sidebar from './Sidebar'
import LabourHome from './LabourHome'
import NewJob from '../FarmerDashboard/NewJob'
import LabourHeader from './LabourHeader'
import LabourDashboardRoutes from './LabourDashboardRoutes'


const LabourDashboardLayout = () => {
  return ( 
    <>
    <div>
        <LabourHeader />
        <div className='d-flex flex-row '>
          <Sidebar />
          <main >
            <LabourDashboardRoutes />
          </main>
        </div>
    </div>
    </>
  )
}

export default LabourDashboardLayout