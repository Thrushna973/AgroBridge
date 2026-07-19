import React from 'react'
import {Routes, Route} from 'react-router-dom';
import AdminHome from './AdminHome';
import Farmers from './InternalPages/Framers';
import Labourers from './InternalPages/Labourers';
import FarmerDetails from './InternalPages/FarmerDetails';
import LabourDetails from './InternalPages/LabourDetails';
import AllJobs from './InternalPages/AllJobs';
import ReportedJobs from './InternalPages/ReportedJobs';
import VerifiedFarmers from './InternalPages/VerifiedFarmers';
import VerifiedLabours from './InternalPages/VerifiedLabours';
import Reports from './InternalPages/Reports';
import Settings from './InternalPages/Settings';
// import LandingPage from '../LabourDashboard/LandingPage';
import Logout from '../../Components/Logout';

const AdminDashboardRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/farmers/:id" element={<FarmerDetails />} />
        <Route path="/labourers" element={<Labourers />} />
        <Route path="/labourers/:id" element={<LabourDetails />} />
        <Route path="/allJobs" element = {<AllJobs />} />
        <Route path="/repotedjobs" element={<ReportedJobs />} />
        <Route path="/verifiedFarmers" element={<VerifiedFarmers />} />
        <Route path="/verifiedLabours" element={<VerifiedLabours />} />
        <Route path="/allreports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} /> 
        {/* <Route path="/login" element={<LandingPage />} /> */}
        <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

export default AdminDashboardRoutes