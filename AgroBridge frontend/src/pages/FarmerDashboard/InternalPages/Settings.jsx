import React, { useState, useEffect } from "react";
import "./Settings.css";
import {useNavigate} from "react-router-dom";

const Settings = () => {

    const token = localStorage.getItem("token");

    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [editProfile, setEditProfile] = useState(false);

    const [profile, setProfile] = useState({

        name: "",

        phone: "",

        email: ""

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

            "import.meta.env.VITE_API_URL/settings/profile",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setProfile({

                name: data.name,

                phone: data.phone,

                email: data.email

            });
            

            // setLoading(false);

        })

        .catch(console.error);

    };

      const loadPreferences = () => {

        fetch(

            "import.meta.env.VITE_API_URL/settings/preferences",

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

            "import.meta.env.VITE_API_URL/settings/notifications",

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

    // ============================================
    // Update Profile
    // ============================================

    const saveProfile = () => {

        fetch(

            "import.meta.env.VITE_API_URL/settings/profile",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(profile)

            }

        )

        .then(res => res.json())

        .then(data => {
            
            alert(data.message);
            setEditProfile(false);

            loadProfile();

        })

        .catch(console.error);

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

            "import.meta.env.VITE_API_URL/settings/password",

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

            "import.meta.env.VITE_API_URL/settings/preferences",

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

            "import.meta.env.VITE_API_URL/settings/notifications",

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

    const handleLogout = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(

            "import.meta.env.VITE_API_URL/auth/logout",

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

                    <button

                        className="edit-btn"

                        onClick={()=>

                            setEditProfile(true)

                        }

                    >

                        Edit

                    </button>

                )

                :

                (

                    <button

                        className="save-btn"

                        onClick={saveProfile}

                    >

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


    {/* ==============================
            Preferences
    ============================== */}

    <div className="settings-card">

        <h3>🌐 Preferences</h3>

        <div className="settings-form">

            <div className="form-group">

                <label>Language</label>

                <select

                    name="language"

                    value={preferences.language}

                    onChange={handlePreferenceChange}

                >

                    <option value="English">English</option>

                    <option value="Telugu">Telugu</option>

                    <option value="Hindi">Hindi</option>

                </select>

            </div>

            <div className="form-group">

                <label>Theme</label>

                <select

                    name="theme"

                    value={preferences.theme}

                    onChange={handlePreferenceChange}

                >

                    <option value="Light">Light</option>

                    <option value="Dark">Dark</option>

                </select>

            </div>

        </div>

        <button

            className="save-btn"

            onClick={savePreferences}

        >

            Save Preferences

        </button>

    </div>

</div>
</>

);

};

export default Settings;


