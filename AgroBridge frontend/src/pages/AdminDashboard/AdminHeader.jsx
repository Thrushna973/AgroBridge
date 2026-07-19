import "./AdminHeader.css";
import labourProfile from '../../assets/labourProfile.jpg';
function AdminHeader() {
  return (
    <div className="header">
      <div>
        <h2>Welcome Admin 👋</h2>
        <p>Here's an overview of AgroBridge platform.</p>
      </div>

      <div className="header-right">
        <input type="date" />

        <img src={labourProfile} alt="profile" />

        <div>
          <h4>Admin User</h4>
          <p>Super Admin</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;