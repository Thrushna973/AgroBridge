import React, {useContext} from 'react'
import './FarmerHome.css'
import { GiWheat } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io"
import LabourProfile from '../../assets/LabourProfile.jpg'
import { AuthContext } from "../../context/AuthContext";
export const FarmerHeader = () => {  
    // const userDetails = JSON.parse(localStorage.getItem("userDetails"));  
    // console.log(userDetails);    
    const { user } = useContext(AuthContext);
  return (
    <div>
                <div className="Farmerheader">
                    <div>
                        <h1>Good Morning, {user?.name} <GiWheat className='wheatIcon'/></h1>
                        <p>Here's what's happening with your farm today.</p>
                    </div>
        
                    <div className='FarmerheaderRight'>
                        <button className='farmerNotificationBtn'> <IoMdNotificationsOutline /> </button>
                        <div className='Farmerprofile'>
                            <img src={user?.photo} alt="Profile" className='FarmerprofilePic' /> 
                            <p><span className='FarmerprofileName'>{user?.name}</span> <br />
                            Farmer</p>
                        </div>
                    </div>
                </div>
    </div>
  )
}
