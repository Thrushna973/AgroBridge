import { useState } from "react";
import { Menu } from "lucide-react";
import '../Components/Hamburger.css'

function hamburger() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <Menu
        size={24}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ cursor: "pointer" }}
      />

      {/* Sidebar */}
      <div className={sidebarOpen ? "sidebar active" : "sidebar"}>
        Sidebar Content
      </div>
    </>
  );
}

export default hamburger;