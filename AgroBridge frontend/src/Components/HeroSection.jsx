import React from 'react'
import "../App.css"
import logo from "../assets/logo.png"
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { IoShieldCheckmark } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Bs1CircleFill } from "react-icons/bs";
import { LuUserRoundPlus } from "react-icons/lu";
import { Bs2CircleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Bs3CircleFill } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa6";
import { Bs4CircleFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";


const HeroSection = () => {
  return (
    <>
        <div className='HeroContainer'>
            <h1 className='heroHead'>Find Local Labour <br /> Grow Together</h1>
            <p className='goalPara'>AgroBridge connects local labourers with farmers and employers for daily work.</p>
            <div className=' iconPara'>
                <HiMiniCheckCircle className='icon'/>
                <p>Verified Profiles</p>
            </div>
            <div className='iconPara'>
                <IoShieldCheckmark className='icon'/>
                <p>Safe & Secure</p>
            </div>
            <div className='iconPara'>
                <FaLocationDot className='icon'/>
                <p>Local Connections</p>
            </div>
        </div>
        <div className= "howItWorks">
            <h1 className='head'>How It Works</h1>
            <div className='CardContainer'>
                <div className='card'>
                    <span className='number'><Bs1CircleFill /></span>
                    <LuUserRoundPlus className='card-icon'/>
                    <h3>Create Profile</h3>
                    <p>Labourers and employers sign up in simple steps.</p>
                </div>

                <div className='arrow'>
                    <RxDoubleArrowRight />
                </div>

                <div className='card'>
                    <span className='number'><Bs2CircleFill /></span>
                    <FaSearch className='card-icon'/>
                    <h3>Find or Post</h3>
                    <p>Employers post jobs,<br /> laboureres find suitable work</p>
                </div>

                <div className='arrow'>
                    <RxDoubleArrowRight />
                </div>

                <div className='card'>
                    <span className='number'><Bs3CircleFill /></span>
                    <FaRegHandshake  className='card-icon'/>
                    <h3>Connect</h3>
                    <p>Chat or call directly <br />within the app</p>
                </div>

                <div className='arrow'>
                    <RxDoubleArrowRight />
                </div>

                <div className='card'>
                    <span className='number'><Bs4CircleFill /></span>
                    <FiCheckCircle className='card-icon'/>
                    <h3>Work & Earn</h3>
                    <p>Complete the work and get rated.</p>
                </div>
            </div> 
        </div>
        <footer className='d-flex flex-row justify-content-center footer'>
            <div className='footerSection1'>
                <div className='items-align'>
                    <img src={logo} alt="AgroBridge" className='logo'/>
                    <div>
                        <h1>AgroBridge</h1>
                        <p>Local.Labour.Reliable</p>
                    </div>
               </div>
               <p>AgroBridge is a platform to connect local labourers with employers. Our mission is to support rural communities.</p>
            </div>

            <div className='footerSection2'>
                <h1>Quick Links</h1>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>For Labourers</a></li>
                    <li><a href='#'>For Employers</a></li>
                    <li><a href='#'>How It Works</a></li>
                    <li><a href='#'>About Us</a></li>
                </ul>
            </div>

            <div className='footerSection3'>
                <h1>Support</h1>
                <ul>
                    <li><a href='#'>Help Center</a></li>
                    <li><a href='#'>Safety Tips</a></li>
                    <li><a href='#'>Privacy Policy</a></li>
                    <li><a href='#'>Terms & Conditions</a></li>
                </ul>
            </div>

            <div className='footerSection4'>
                <h1>Contact Us</h1>
                <div className='contact'>
                    <IoCallOutline className='icon'/>
                    <p>91+7532589648</p>
                </div>
                <div  className='contact'>
                    <MdOutlineMailOutline className='icon'/>
                    <p>support@agrobridge.com</p>
                </div>
                <div  className='contact'>
                    <IoLocationOutline className='icon'/>
                    <p>Ameerpet,Hyderabad,India</p>
                </div>                
            </div>            
        </footer>
    </>
  )
}

export default HeroSection