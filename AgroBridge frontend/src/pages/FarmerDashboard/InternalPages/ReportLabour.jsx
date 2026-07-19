import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../LabourDashboard/InternalPages/ReportJob.css";
import {AuthContext} from "../../../context/AuthContext";

const ReportLabour = () => {

    const navigate = useNavigate();

    const { labourId } = useParams();
    console.log(labourId);
    const token = localStorage.getItem("token");
    // console.log(token);
    const {user } = useContext(AuthContext);

    const [report, setReport] = useState({
        reason: "",
        description: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setReport(prev => ({
            ...prev,
            [name]: value
        }));

    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     if(!file) return;
    //     setReport((prev) => ({...prev, evidence: file}));
    // };

    const handleSubmit = async (e) => {

    e.preventDefault();

    // const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
        reportedUserId: labourId,
        reportType: "User",
        reportedBy: user.id,
        reason: report.reason,
        description: report.description,
        status:"Pending"
        // evidence: report.evidence
    };
    console.log(payload);

    try {

        const response = await fetch(
            "http://localhost:5000/api/reports",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                        Authorization:`Bearer ${token}`
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Report submitted successfully!");

            console.log(data);

            navigate(-1); // Go back to the previous page

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

};

    return (

        <div className="reportPage">

            <form
                className="reportCard"
                onSubmit={handleSubmit}
            >

                <h2>Report Labour</h2>

                <label className="heading">Reason</label>

                <div className="radioGroup">

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Fraud / Fake Identity"
                            onChange={handleChange}
                        />
                        Fraud / Fake Identity
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Misbehaviour"
                            onChange={handleChange}
                        />
                        Misbehaviour
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Poor Work Quality"
                            onChange={handleChange}
                        />
                        Poor Work Quality
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Left Work Incomplete"
                            onChange={handleChange}
                        />
                        Left Work Incomplete
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Damaged Crops or Equipment"
                            onChange={handleChange}
                        />
                        Damaged Crops or Equipment
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Safety Rule Violation"
                            onChange={handleChange}
                        />
                        Safety Rule Violation
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Other"
                            onChange={handleChange}
                        />
                        Other
                    </label>

                </div>

                {/* <label className="heading">Evidence</label>

                <input
                    type='file'
                    name="evidence"
                    onChange={handleFileChange}
                />

                <br />
                <br /> */}

                <label className="heading">Description</label>

                <textarea
                    rows="5"
                    name="description"
                    onChange={handleChange}
                />


                <div className="buttons">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-danger"
                    >
                        Submit Report
                    </button>

                </div>

            </form>

        </div>

    );

};

export default ReportLabour;