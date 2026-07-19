import React, { useEffect, useState, useContext } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { MdToken } from "react-icons/md";
import {AuthContext} from "../../../context/AuthContext";

const Settings = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const {user} = useContext(AuthContext);
    const [adminProfile, setAdminProfile] = useState({
        name: "Admin User",
        email: "admin@agrobridge.com",
        phone: "+91 9876543210"
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [platform, setPlatform] = useState({
        supportEmail: "support@agrobridge.com",
        supportPhone: "+91 9123456780",
        version: "1.0.0"
    });

    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        push: false
    });

    const handleProfileChange = (e) => {

        const { name, value } = e.target;

        setAdminProfile((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

        setPassword((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handlePlatformChange = (e) => {

        const { name, value } = e.target;

        setPlatform((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleNotificationChange = (e) => {

        const { name, checked } = e.target;

        setNotifications((prev) => ({
            ...prev,
            [name]: checked
        }));

    };

    const getProfile = () => {

    fetch(`http://localhost:5000/api/settings/profile/${user?.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

        .then(res => res.json())

        .then(data => {

            setAdminProfile({

                name: data.name,

                email: data.email,

                phone: data.phone

            });

        });

};

const getSettings = () => {

    fetch("http://localhost:5000/api/settings", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

        .then(res => res.json())

        .then(data => {

            setPlatform({

                supportEmail: data.supportEmail,

                supportPhone: data.supportPhone,

                version: data.version

            });

            setNotifications({

                email: Boolean(data.emailNotifications),

                sms: Boolean(data.smsNotifications),

                push: Boolean(data.pushNotifications)

            });

        });

};

useEffect(() => {
    if (!user) return;

    getProfile();

    getSettings();
    console.log("Context User:", user);
    console.log("User ID:", user?.id);

}, [user]);

const handleProfileSubmit = async () => {

    const response = await fetch(

        `http://localhost:5000/api/settings/profile/${user?.id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`

            },

            body: JSON.stringify(adminProfile)

        }

    );

    const data = await response.json();

    alert(data.message);

    getProfile();

};

const handlePasswordSubmit = async () => {

    const response = await fetch(

        `http://localhost:5000/api/settings/password/${user?.id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`

            },

            body: JSON.stringify(password)

        }

    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {

        setPassword({

            currentPassword: "",
            newPassword: "",
            confirmPassword: ""

        });

    }

};

const handleSettingsSubmit = async () => {

    const payload = {

        ...platform,

        emailNotifications: notifications.email,

        smsNotifications: notifications.sms,

        pushNotifications: notifications.push

    };

    const response = await fetch(

        "http://localhost:5000/api/settings",

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`

            },

            body: JSON.stringify(payload)

        }

    );

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", data);

    alert(data.message);

    getSettings();

};

    return (

        <div className="settingsPage">

            <h2 className="settingsTitle">
                Settings
            </h2>

            <div className="settingsGrid">

                {/* =======================
                    Admin Profile
                ======================== */}

                <div className="settingsCard">

                    <h3>
                        Admin Profile
                    </h3>

                    <div className="inputGroup">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={adminProfile.name}
                            onChange={handleProfileChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={adminProfile.email}
                            onChange={handleProfileChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={adminProfile.phone}
                            onChange={handleProfileChange}
                        />

                    </div>

                    <button className="saveBtn" onClick={handleProfileSubmit}>
                        Update Profile
                    </button>

                </div>

                {/* Change Password Card Starts Here */}

                {/* =======================
                    Change Password
                ======================== */}

                <div className="settingsCard">

                    <h3>
                        Change Password
                    </h3>

                    <div className="inputGroup">

                        <label>Current Password</label>

                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter current password"
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>New Password</label>

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                        />

                    </div>

                    <button className="saveBtn" onClick={handlePasswordSubmit}>

                        Update Password
                    </button>

                </div>

                {/* =======================
                    Platform Settings
                ======================== */}

                <div className="settingsCard">

                    <h3>
                        Platform Settings
                    </h3>

                    <div className="inputGroup">

                        <label>Support Email</label>

                        <input
                            type="email"
                            name="supportEmail"
                            value={platform.supportEmail}
                            onChange={handlePlatformChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Support Phone</label>

                        <input
                            type="text"
                            name="supportPhone"
                            value={platform.supportPhone}
                            onChange={handlePlatformChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Platform Version</label>

                        <input
                            type="text"
                            name="version"
                            value={platform.version}
                            onChange={handlePlatformChange}
                        />

                    </div>

                    <button
    className="saveBtn"
    onClick={handleSettingsSubmit}
>
                        Save Changes
                    </button>

                </div>

                {/* =======================
                    Notification Settings
                ======================== */}

                <div className="settingsCard">

                    <h3>
                        Notification Settings
                    </h3>

                    <div className="toggleRow">

                        <span>Email Notifications</span>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="email"
                                checked={notifications.email}
                                onChange={handleNotificationChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <div className="toggleRow">

                        <span>SMS Notifications</span>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="sms"
                                checked={notifications.sms}
                                onChange={handleNotificationChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <div className="toggleRow">

                        <span>Push Notifications</span>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="push"
                                checked={notifications.push}
                                onChange={handleNotificationChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Settings;