import React, {useContext} from 'react'
import './LabourHome.css'
import ToggleBtn from "./ToggleBtn"
import mrngcardImg from "../../assets/mrngcardImg.png"
import {AuthContext} from "../../context/AuthContext";

const LabourHeader = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    
  return (
    <div>
       <div className='labourIntroCard'>
            <div>
                <h2>Good Morning,</h2>
                <h1>{user?.name}👋</h1>
                   <ToggleBtn />
            </div>
        </div>  
    </div>
  )
}

export default LabourHeader