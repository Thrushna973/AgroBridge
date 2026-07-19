import {
  LayoutDashboard,
  Search,
  CalendarDays,
  MessageCircle,
  CircleDollarSign,
  User,
  FileText,
  HelpCircle,
  Settings,
  Headphones,
  LogOut 
} from "lucide-react";
import logo from "../../assets/logo.png";
import "./Sidebar.css";
import {useNavigate} from "react-router-dom"; 

export default function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true , path:"/labour-home"},
    { icon: <Search size={20} />, label: "Search Jobs", path: "/labour-home/searchJobs" },
    { icon: <CalendarDays size={20} />, label: "My Bookings" , path:"/labour-home/myBookings"},
    { icon: <User size={20} />, label: "Profile", path:"/labour-home/profile" },
    { icon: <Settings size={20} />, label: "Settings", path:"/labour-home/settings" },
    { icon: <LogOut  size={20} />, label: "Logout", path:"/labour-home/logout" }
  ];

  return (
    <div className="sidebar">
      {/* <div className="logo">
        <div ><img src={logo} className="logo-icon"/></div>
        <h2>AgroBridge</h2>
      </div> */}

      <nav className="menu">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`menu-item ${item.active ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
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

      <div className="leaf-bg"></div>
    </div>
  );
}