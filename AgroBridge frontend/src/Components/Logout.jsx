import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {

    const navigate = useNavigate();

    const handleCancel = () => {

        navigate(-1);

    };

    const handleLogout = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(

            "http://localhost:5000/api/auth/logout",

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (response.ok) {

            localStorage.removeItem("token");

            alert(data.message);

            navigate("/");

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

};

    return (

        <div className="logoutPage">

            <div className="logoutCard">

                <div className="logoutIcon">

                    <i className="fa-solid fa-right-from-bracket"></i>

                </div>

                <h2>

                    Logout

                </h2>

                <p className="logoutText">

                    Are you sure you want to logout?

                </p>

                <p className="logoutSubText">

                    You will be logged out of your account and
                    need to login again to continue.

                </p>

                <div className="logoutButtons">

                    <button
                        className="cancelBtn"
                        onClick={handleCancel}
                    >

                        Cancel

                    </button>

                    <button
                        className="logoutBtn"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

                <div className="securityBox">

                    <i className="fa-solid fa-shield-halved"></i>

                    <span>

                        For your security, please logout when you
                        are done using AgroBridge.

                    </span>

                </div>

            </div>

        </div>

    );

};

export default Logout;