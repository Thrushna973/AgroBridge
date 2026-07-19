import React , {useState, useEffect} from 'react';
import './Login.css';
import LabourHome from '../pages/LabourDashboard/LabourHome';
import Sidebar from '../pages/LabourDashboard/Sidebar';
import { BrowserRouter, data } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LabourLogin = ({ closeModal }) => {

    const navigate = useNavigate();

    const [labourLoginData, setLabourLoginData] = useState({
        email:"",
        password:"",
    }); 

    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setLabourLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(labourLoginData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
            
            // Save token
            localStorage.setItem("token", data.token);

            //  Save logged-in user
            // if (data.user.role === "farmer"){
            //     localStorage.setItem("user", JSON.stringify(data.user));
            // }
            // else if(data.user.role === "labourer"){
            //     localStorage.setItem("labour", JSON.stringify(data.user));
            // }
            

            // // Fetch complete user details
            // const detailsResponse = await fetch(
            //     `http://localhost:5000/api/auth/users/${data.user.id}`
            // );

            // const userDetails = await detailsResponse.json();

            // localStorage.setItem(
            //     "userDetails",
            //     JSON.stringify(userDetails)
            // );

        
            const detailsResponse = await fetch(
                "http://localhost:5000/api/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                }
            );

            // const userDetails = await detailsResponse.json();

            // localStorage.setItem(
            //     "userDetails",
            //     JSON.stringify(userDetails)
            // );

            alert("Login Successful");
            if (data.user.role === "labourer") {
                navigate("/labour-home");
            }
            else if (data.user.role === "farmer") {
                navigate("/farmer-home");
            }
            else if (data.user.role === "admin") {
                navigate("/admin-home");
            }

        }
        catch (error) {

            console.log(error);
            alert("Server Error");

        }

    };

    

  return (
    <div className='labourLoginContainer'>
        <form className='labourLoginDetails' onSubmit={handleSubmit}>
            <button                                                  
                    className="close-btn"
                    onClick={closeModal}
                >
                ×
            </button>
            <h1>Login</h1>
            <div className='d-flex flex-row justify-content-center mt-5'>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        className='labourLoginEmail labourLoginInput' 
                        id='email' 
                        name='email'
                        value={labourLoginData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        className='labourLoginInput' 
                        id='password' 
                        name='password'
                        value={labourLoginData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <div className='d-flex flex-row justify-content-center mt-3'>
                        <button type='submit' className='loginBtn' >
                            Login
                           
                        </button>
                    </div> 
                </div>
            </div>
        </form>
    </div>
  )
}

export default LabourLogin