import React, { useState, useEffect } from "react";
import "../../FarmerDashboard/InternalPages/Settings.css";
import {useNavigate} from "react-router-dom";

const Settings = () => {

    const token = localStorage.getItem("token");

    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [editProfile, setEditProfile] = useState(false);

   const [profile, setProfile] = useState({

    name: "",

    phone: "",

    email: "",

    age: "",

    village: "",

    skills: "",

    experience: "",

    dailyWage: "",

    availability: "",

    description: ""

});

    const [password, setPassword] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [preferences, setPreferences] = useState({

        language: "English",

        theme: "Light"

    });

    const [notifications, setNotifications] = useState({

        notifyApplications: true,

        notifyAttendance: true,

        notifyPayments: true,

        notifyReports: true

    });

        useEffect(() => {

        loadProfile();

        loadPreferences();

        loadNotifications();

    }, []);

     const loadProfile = () => {

    fetch(
        "http://localhost:5000/api/settings/labourProfile",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )

    .then(res=>res.json())

    .then(data=>{

        setProfile(data);

    });

};

      const loadPreferences = () => {

        fetch(

            "http://localhost:5000/api/settings/preferences",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setPreferences(data);

        })

        .catch(console.error);

      };

      const loadNotifications = () => {

        fetch(

            "http://localhost:5000/api/settings/notifications",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setNotifications(data);

        })

        .catch(console.error);

      };

        const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

        const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };

        const handlePreferenceChange = (e) => {

        setPreferences({

            ...preferences,

            [e.target.name]: e.target.value

        });

    };

        const handleNotificationChange = (e) => {

        setNotifications({

            ...notifications,

            [e.target.name]: e.target.checked

        });

    };

    //     if (loading) {

    //     return <h2>Loading...</h2>;

    // }

    // ============================================
    // Update Profile
    // ============================================



const saveProfile = async () => {

    try {

        const response = await fetch(

            "http://localhost:5000/api/settings/profile",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(profile)

            }

        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            navigate("/labour-home/profile");

        }

    }

    catch (err) {

        console.log(err);

    }

};

    // ============================================
    // Change Password
    // ============================================

    const changePassword = () => {

        if(password.newPassword !== password.confirmPassword){

            alert("Passwords do not match.");

            return;

        }

        fetch(

            "http://localhost:5000/api/settings/password",

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify(password)

            }

        )

        .then(res=>res.json())

        .then(data=>{

            alert(data.message);

            setPassword({

                currentPassword:"",

                newPassword:"",

                confirmPassword:""

            });

        })

        .catch(console.error);

    };

    console.log(profile);
    // ============================================
    // Save Preferences
    // ============================================

    const savePreferences = () => {

        fetch(

            "http://localhost:5000/api/settings/preferences",

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify(preferences)

            }

        )

        .then(res=>res.json())

        .then(data=>{

            alert(data.message);

        })

        .catch(console.error);

    };


    // ============================================
    // Save Notification Settings
    // ============================================

    const saveNotifications = () => {

        fetch(

            "http://localhost:5000/api/settings/notifications",

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify(notifications)

            }

        )

        .then(res=>res.json())

        .then(data=>{

            alert(data.message);

        })

        .catch(console.error);

    };

    return (
<>
<div className="settings-header">

        <h2>Settings</h2>

        <p>

            Manage your profile, security and preferences.

        </p>

</div>
<div className="settings-container">

    {/* ==============================
            Profile Settings
    ============================== */}

    <div className="settings-card">
        <div className="card-header">
            <h3>👤 Profile Settings</h3>
            {
                !editProfile ?
                (
                    <button className="edit-btn" onClick={()=> setEditProfile(true)}>
                        Edit
                    </button>
                ) : (
                    <button className="save-btn" onClick={saveProfile}>
                        Save
                    </button>
                )
            }

        </div>

        <div className="settings-form">

            <div className="form-group">

                <label>Name</label>

                <input

                    type="text"

                    name="name"

                    value={profile.name}

                    disabled={!editProfile}

                    onChange={handleProfileChange}

                />

            </div>

            <div className="form-group">

                <label>Phone</label>

                <input

                    type="text"

                    name="phone"

                    value={profile.phone}

                    disabled={!editProfile}

                    onChange={handleProfileChange}

                />

            </div>

            <div className="form-group">

                <label>Email</label>

                <input

                    type="email"

                    name="email"

                    value={profile.email}

                    disabled={!editProfile}

                    onChange={handleProfileChange}

                />

            </div>

        </div>

    </div>


    {/* ==============================
            Password
    ============================== */}

    <div className="settings-card">

        <h3>

            🔒 Change Password

        </h3>

        <div className="settings-form">

            <div className="form-group">

                <label>

                    Current Password

                </label>

                <input

                    type="password"

                    name="currentPassword"

                    value={password.currentPassword}

                    onChange={handlePasswordChange}

                />

            </div>

            <div className="form-group">

                <label>

                    New Password

                </label>

                <input

                    type="password"

                    name="newPassword"

                    value={password.newPassword}

                    onChange={handlePasswordChange}

                />

            </div>

            <div className="form-group">

                <label>

                    Confirm Password

                </label>

                <input

                    type="password"

                    name="confirmPassword"

                    value={password.confirmPassword}

                    onChange={handlePasswordChange}

                />

            </div>

            <button

                className="save-btn"

                onClick={changePassword}

            >

                Change Password

            </button>

        </div>

    </div>

        {/* ==============================
            Notifications
    ============================== */}

    <div className="settings-card">

        <h3>🔔 Notifications</h3>

        <div className="checkbox-group">

            <label>

                <input
                    type="checkbox"
                    name="notifyApplications"
                    checked={notifications.notifyApplications}
                    onChange={handleNotificationChange}
                />

                Job Applications

            </label>

            <label>

                <input
                    type="checkbox"
                    name="notifyAttendance"
                    checked={notifications.notifyAttendance}
                    onChange={handleNotificationChange}
                />

                Attendance Updates

            </label>

            <label>

                <input
                    type="checkbox"
                    name="notifyPayments"
                    checked={notifications.notifyPayments}
                    onChange={handleNotificationChange}
                />

                Payment Updates

            </label>

            <label>

                <input
                    type="checkbox"
                    name="notifyReports"
                    checked={notifications.notifyReports}
                    onChange={handleNotificationChange}
                />

                Report Updates

            </label>

        </div>

        <button

            className="save-btn"

            onClick={saveNotifications}

        >

            Save Notifications

        </button>

    </div>

</div>
</>

);

};

export default Settings;


