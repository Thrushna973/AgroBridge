import { Routes, Route } from "react-router-dom";
import LabourLogin from "../Components/LabourLogin";
import LabourHome from '../pages/LabourDashboard/LabourHome';

function AppRoutes() {
  return (
    <Routes>      
      <Route path="/labour-login" element={<LabourLogin />} />
      <Route path="/labour-home" element={<LabourHome />} />
    </Routes>
  );
}

export default AppRoutes;