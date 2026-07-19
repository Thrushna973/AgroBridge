import "./AdminSidebar.css";
import { useState } from "react";
import { FaUsers, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BadgeCheck,
  IndianRupee,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import logo from '../../assets/logo.png'

function AdminSidebar() {
  const navigate = useNavigate();
  const [usersOpen, setUsersOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [vertifactions, setVerifications] = useState(false);

  return (
    <div className="sidebar">
      <ul className="menu">
        <li className="dashboardmain" onClick={()=> navigate("/admin-home")}>
          <LayoutDashboard size={18} />
          Dashboard
        </li>
        <li className="usersidebar">
          <div>
                {/* Users Dropdown */}
                <div className="usersmenu-item" onClick={() => setUsersOpen(!usersOpen)} >
                  <div className="menu-left">
                    <FaUsers />
                    <span>Users</span>
                  </div>

                  <div>{usersOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
                </div>
                
                {usersOpen && (
                  <div className="submenu">
                    <div onClick={()=> navigate("/admin-home/farmers")} className="submenu-item">
                      Farmers
                    </div>

                    <div onClick={()=> navigate("/admin-home/labourers")} className="submenu-item">
                      Labourers
                    </div>
                  </div>
                )}
          </div>
        </li>
        <li className="usersidebar">
          <div>
                <div className="usersmenu-item" onClick={() => setJobsOpen(!jobsOpen)} >
                  <div className="menu-left">
                    <Briefcase />
                    <span>Jobs</span>
                  </div>

                  {jobsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                
                {jobsOpen && (
                  <div className="submenu">
                    <div onClick={()=> navigate("/admin-home/allJobs")} className="submenu-item">
                      All Jobs
                    </div>

                    <div onClick={()=> navigate("/admin-home/repotedjobs")} className="submenu-item">
                      Reported Jobs
                    </div>
                  </div>
                )}
          </div>
        </li>

        <li>
          <div >
                <div className="usersmenu-item" onClick={() => setVerifications(!vertifactions)} >
                  <div className="menu-left">
                    <Briefcase />
                    <span>Verifications</span>
                  </div>
                  {vertifactions ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                
                {vertifactions && (
                  <div className="submenu">
                    <div onClick={()=> navigate("/admin-home/verifiedFarmers")} className="submenu-item">
                      Verified Farmers
                    </div>

                    <div onClick={()=> navigate("/admin-home/verifiedLabours")} className="submenu-item">
                      Verified Labours
                    </div>
                  </div>
                )}
          </div>
        </li>

        {/* <li>
          <IndianRupee size={18} />
          Transactions
        </li>

        <li>
          <BarChart3 size={18} />
          Analytics
        </li> */}

        <li className = "listyle" onClick={()=> navigate("/admin-home/allreports")}>
          <FileText size={18} />
          Reports
        </li>

        <li className = "listyle" onClick={() => navigate("/admin-home/settings")}>
          <Settings size={18} />
          Settings
        </li>

        <li className = "listyle" onClick={() => navigate("/admin-home/logout")}>
          <LogOut size={18} />
          Logout
        </li>
      </ul>

      <div className="sidebar-card">
        <h4>AgroBridge Admin Panel</h4>
        <p>Building a stronger bridge between farmers and labourers.</p>
      </div>
    </div>
  );
}

export default AdminSidebar;