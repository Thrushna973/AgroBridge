import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReportJob.css";
import {AuthContext} from "../../../context/AuthContext";

const ReportJob = () => {

    const navigate = useNavigate();

    const { jobid } = useParams();
    console.log(jobid);
    const token = localStorage.getItem("token");
    const { user } = useContext(AuthContext);

    const [report, setReport] = useState({
        reason: "",
        description: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setReport(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    // const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
        reportType:"Job",
        jobid: Number(jobid),
        reason: report.reason,
        description: report.description
    };

    try {

        const response = await fetch(
            "import.meta.env.VITE_API_URL/reports",
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

                <h2>Report Job</h2>

                <label className="heading">Reason</label>

                <div className="radioGroup">

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Fake Job"
                            onChange={handleChange}
                        />
                        Fake Job
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Wrong Wage"
                            onChange={handleChange}
                        />
                        Wrong Wage
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Incorrect Location"
                            onChange={handleChange}
                        />
                        Incorrect Location
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Fraud / Scam"
                            onChange={handleChange}
                        />
                        Fraud / Scam
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Offensive Content"
                            onChange={handleChange}
                        />
                        Offensive Content
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="Already Filled"
                            onChange={handleChange}
                        />
                        Already Filled
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

export default ReportJob;