import React from 'react'
import { ClipboardCheck,
    LayoutDashboard ,
    CalendarCheck ,
    MessageCircle,
    AppWindowMac ,
    User ,
    Users ,
    Clock ,
    BadgeIndianRupee ,
    BookText ,
    NotepadText ,
    Wheat ,
    Settings,
    Headphones,
    LogOut
} from 'lucide-react';
import { GiHamburgerMenu } from "react-icons/gi";
import '../LabourDashboard/Sidebar.css'
import { useNavigate } from "react-router-dom";

const FarmerSidebar = () => {
    const navigate = useNavigate();
    
        const FarmerMenuItems = [
            { icon: <LayoutDashboard  size={20} />, label: "Dashboard", path: "/farmer-home" },
            { icon: <ClipboardCheck size={20} />, label: "Post New Job", path : "/farmer-home/post-job" },
            { icon: <CalendarCheck size={20} />, label: "My jobs", path: "/farmer-home/myJobs" },
            { icon: <AppWindowMac size={20} />, label: "Applications" , path:"/farmer-home/applications"},
            { icon: <Clock size={20} />, label: "Attendence" , path:"/farmer-home/attendance"},
            { icon: <Wheat size={20} />, label: "Farm Profile", path:"/farmer-home/farmProfile"},
            { icon: <Settings size={20} />, label: "Settings", path:"/farmer-home/farmerSettings"},
            { icon: <LogOut  size={20} />, label: "Logout", path:"/farmer-home/logout" }
        ];
  return (
    <div className="sidebar">
        <nav className="menu">
            {FarmerMenuItems.map((item, index) => (
                <button
                    key={index}
                    className={`menu-item ${item.active ? "active" : ""}` }
                 onClick={() => navigate(item.path)} >
                    <div className="menu-left">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                    {item.badge && (
                        <span className="badge">{item.badge}</span>
                    )}  
                </button>
            ))}
        </nav>

        <div className="support-card">
            <h4>Need Help?</h4>
            <p>Our support team is here to help you.</p>

            <button>
                <Headphones size={18} />
                Contact Support
            </button>
        </div>

    </div>
  )
}

export default FarmerSidebar