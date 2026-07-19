import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Profile.css";
import {
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Pencil
} from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const loadProfile = () => {

        fetch(
            "import.meta.env.VITE_API_URL/settings/labourProfile",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        .then(res=>res.json())
        .then(data=>{
            setProfile(data);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        });
    };

    useEffect(()=>{
        loadProfile();
    },[]);

    if(loading){
        return(
            <div className="profileLoading">
                Loading Profile...
            </div>
        );
    }

    return(
        <div>
        <div className="labourProfilePage">

            <div className="profileHeader">

                <h2>My Profile</h2>

            </div>

            <div className="profileTopCard">

                <img src={`http://localhost:5000/uploads/${profile.photo}`} alt="profile" className="profileImage"/>
                <button className="editProfileBtn" onClick={() => navigate("/labour-home/settings")}>

                    <Pencil size={18}/>

                    Edit Profile

                </button>

                <div>

                    <h3>

                        {profile.name}

                    </h3>

                    <p>

                        {profile.skills}

                    </p>

                </div>

            </div>
            <h3>

                        Personal Information

                    </h3>
           
            <div className = "infoFullCard" style = {{gap:"70px"}}>
                 
                    

                    {/* <div className="infoGrid"> */}

                        <div className="infoItem">

                            <User/>

                            <div>

                                <span>Name</span>

                                <h5>{profile.name}</h5>

                            </div>

                        </div>

                        <div className="infoItem">

                            <Phone/>

                            <div>

                                <span>Phone</span>

                                <h5>{profile.phone}</h5>

                            </div>

                        </div>

                        <div className="infoItem">

                            <Mail/>

                            <div>

                                <span>Email</span>

                                <h5>{profile.email}</h5>

                            </div>

                        </div>

                        <div className="infoItem">

                            <Calendar/>

                            <div>

                                <span>Age</span>

                                <h5>{profile.age}</h5>

                            </div>

                        </div>

                        <div className="infoItem">

                            <MapPin/>

                            <div>

                                <span>Village</span>

                                <h5>{profile.village}</h5>

                            </div>

                        </div>

            </div>
            <div className="profileActions">

                <button className="cancelBtn" onClick={() => window.history.back()}>

                    Back

                </button>

                {/* <button className="saveBtn" onClick={() => setEditProfile(true)}>

                    Edit Profile

                </button> */}

            </div>

            {

                editProfile &&

                <div className="editModal">

                    <div className="editCard">

                        <h3>

                            Edit Profile

                        </h3>

                        <p>

                            This button can navigate to your existing
                            Settings page where profile editing is already
                            implemented.

                        </p>

                        <div className="modalButtons">

                            <button className="cancelBtn" onClick={() => setEditProfile(false)}>

                                Close

                            </button>

                            <button className="saveBtn" onClick={() => {window.location.href="/labour-home/settings";}}>

                                Go to Settings

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>
        </div>

    );

};

export default Profile;