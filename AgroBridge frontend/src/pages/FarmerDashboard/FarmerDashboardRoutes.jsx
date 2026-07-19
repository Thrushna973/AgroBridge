import React from 'react'
import {Routes, Route} from "react-router-dom"
import FarmerHome from '../FarmerDashboard/FarmerHome'
import PostNewJob from './InternalPages/PostNewJob'
import MyJobs from './InternalPages/MyJobs'
import Applications from './InternalPages/Applications'
import ReportLabour from './InternalPages/ReportLabour' 
import Attendance from './InternalPages/Attendance'
import FarmProfile from "./InternalPages/FarmProfile"
import Settings from "./InternalPages/Settings";
import LogOut from "../../Components/Logout"
const FarmerDashboardRoutes = () => {
  return (
    <div>
           <Routes>
                <Route path='/'  element={<FarmerHome />}    /> 
                <Route path="/post-job" element={<PostNewJob />} /> 
                <Route path = "/myJobs" element = {<MyJobs />} />
                <Route path="/applications" element={<Applications />} />
                <Route path='/reportLabour/:labourId' element={<ReportLabour />} />
                <Route path="/attendance" element = {<Attendance />} />
                <Route path= "/farmProfile" element = {<FarmProfile />} />
                <Route path = "/farmerSettings" element = {<Settings />} />
                <Route path="/logout" element = {<LogOut />} />
            </Routes>
    </div>
  )
}

export default FarmerDashboardRoutes