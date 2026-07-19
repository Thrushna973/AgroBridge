import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './FarmerDetails.css';

const FarmerDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [farmer, setFarmer] = useState({});

    useEffect(() => {

        fetch(`import.meta.env.VITE_API_URL/auth/users/${id}`)
        .then(res => res.json())
        .then(data => {  
            console.log(data);
            setFarmer(data);
        })
        .catch(err => console.log(err));

    }, [id]);

    return (

        <div className="farmer-details-container">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
                >
                ← Back
            </button>

            <h1>Farmer Details</h1>

            <div className="farmer-card">

                <div className="farmer-header">

                    <img
                        src={`http://localhost:5000/uploads/${farmer.photo}`}
                        alt=""
                        className="farmer-photo"
                    />

                    <div>
                        <h1 className="farmer-name">
                            {farmer.name}
                        </h1>

                        <p className="farmer-role">
                            Farmer
                        </p>
                    </div>

                </div>
            
                <div className="details-grid">

                    <div className="detail-box">
                        <p className="detail-title">Email</p>
                        <p className="detail-value">{farmer.email}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Village</p>
                        <p className="detail-value">{farmer.village}</p>
                    </div>

                    <div className="detail-box">
                            <p className="detail-title">Farm Type</p>
                        <p className="detail-value">{farmer.farmtype}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Farm Size</p>
                        <p className="detail-value">{farmer.farmsize} Acres</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Workers Required</p>
                        <p className="detail-value">{farmer.noofworkers}</p>
                    </div>

                    <div className="detail-box">
                        <p className="detail-title">Role</p>
                        <p className="detail-value">{farmer.role}</p>
                    </div>
                </div>
            </div>
        </div>

    );

};

export default FarmerDetails;