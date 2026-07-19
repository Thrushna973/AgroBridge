import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LabourHome from './LabourHome'
import AllJobs from '../AdminDashboard/InternalPages/AllJobs';
import ReportJob from "./InternalPages/ReportJob"
import MyBookings from './InternalPages/myBookings';
import SearchJobs from './InternalPages/searchJobs';
import Profile from './InternalPages/Profile';
import LogOut from "../../Components/Logout"
import Settings from './InternalPages/Settings';

const LabourDashboardRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element = {<LabourHome />} />
            <Route path = "/alljobs" element = {<AllJobs />} />
            <Route path="/reportjob/:jobid" element = {<ReportJob />} />
            <Route path = "/myBookings" element = {<MyBookings />} />
            <Route path="/searchJobs" element = {<SearchJobs />} />
            <Route path = "/profile" element = {<Profile />} />
            <Route path="/logout" element = {<LogOut />} />
            <Route path = "/settings" element = {<Settings />} />
        </Routes>
    </div>
  )
}

export default LabourDashboardRoutes