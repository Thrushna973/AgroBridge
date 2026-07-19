import React, {useState} from 'react'
import logo from "../assets/logo.png"
import { Routes, Route } from "react-router-dom";
import LabourersRegister from "./LabourersRegister"
import "../App.css"                   
import { FaBullseye } from 'react-icons/fa6';
import EmployersRegister from './EmployersRegister';
import Login from './Login';
import AdminRegister from './AdminRegister';


const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(null);
    const [showpopUp, setShowpopUp] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
        <nav className="navbar">
            <div className="logo-section">
                <img src={logo} alt="AgroBridge" />
            </div>

            <ul className="nav-links">
            {["Home", "How It Works", "AboutUs", "Contact"].map((item) => (          
                <li key={item}>
                <a
                    href="#"
                    className={active === item ? "active" : ""}
                    onClick={() => setActive(item)}
                >
                    {item}
                </a>
                </li>
            ))}
            </ul>
            <ul className='nav-buttons'>
                <li className='nav-link register'>
                    <a href='#'>Register
                        <span className='dropdown-icon'>
                            ▼
                        </span>
                    </a>
                    <ul className = "drop-down">
                        <li>
                            <button onClick={() => setShowModal('register')} className='drop-btn'>
                                Labourers          
                            </button>
                                    {showModal === 'register' && (
                                    <LabourersRegister closeModal={() => setShowModal(null)}/>
                                )}
                        </li>
                        <li>
                            <button onClick={()=> setShowpopUp(true)} className='drop-btn'>
                                Employers
                            </button>
                                {showpopUp && (
                                    <EmployersRegister closePopUp = {()=> setShowpopUp(false)} />
                                )}
                        </li>
                        <li>
                            <button onClick={()=> setShowAdmin(true)} className='drop-btn'>
                                Admin
                            </button>
                                {showAdmin && (
                                    <AdminRegister closePopUp = {()=> setShowAdmin(false)} />
                                )}
                        </li>
                    </ul>
                </li>
                <li>
                    <button onClick={() => setShowModal('login')} className='LoginBtn'>Login</button>
                      {showModal === 'login' && (
                            <Login closeModal={() => setShowModal(null)}/>
                        )}
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar