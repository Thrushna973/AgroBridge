import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './FarmerDetails.css';

const LabourDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [labour, setLabour] = useState({});

    useEffect(() => {

        fetch(`import.meta.env.VITE_API_URL/auth/users/${id}`)
        .then(res => res.json())
        .then(data => {  
            console.log(data);
            setLabour(data);
        })
        .catch(err => console.log(err));

    }, [id]);

    return (
    <>    
        <div className="farmer-details-container">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
                >
                ← Back
            </button>

            <h1>Labour Details</h1>

            <div className="farmer-card">

                <div className="farmer-header">

                    <img
                        src={`http://localhost:5000/uploads/${labour.photo}`}
                        alt=""
                        className="farmer-photo"
                    />

                    <div>
                        <h1 className="farmer-name">
                            {labour.name}
                        </h1>

                        <p className="farmer-role">
                            Labour
                        </p>
                    </div>

                </div>
            
                <div className="details-grid">

                    <div className="detail-box">
                        <p className="detail-title">Email</p>
                        <p className="detail-value">{labour.email}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Village</p>
                        <p className="detail-value">{labour.village}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Age</p>
                        <p className="detail-value">{labour.age}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Skills</p>
                        <p className="detail-value">{labour.skills}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Role</p>
                        <p className="detail-value">{labour.role}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );

};

export default LabourDetails;

