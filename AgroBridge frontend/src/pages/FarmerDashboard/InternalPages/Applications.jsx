import React, { useEffect, useState, useContext } from "react";
import './Applications.css';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';

const Applications = () => {
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("user"));
    const [applications, setApplications] = useState([]);
    const token = localStorage.getItem("token");
    const { user } = useContext(AuthContext);

    const getApplications = () => {

    fetch(`import.meta.env.VITE_API_URL/applications/farmer`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )

        .then(res => res.json())
        .then(data => {
            setApplications(data);
            console.log(data);
        });

    };
    useEffect(()=> {
        getApplications();
    }, []);
    

const [selectedApplication, setSelectedApplication] = useState(null);

const [selectedLabour, setSelectedLabour] = useState(null);

    
    const handleHire = async () => {

    await fetch(
        `import.meta.env.VITE_API_URL/applications/${selectedApplication.id}/status`,
        {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                status: "Accepted"
            })

        }
    );

    getApplications();
    getLabour(selectedApplication.labourId);

};

    const handleReject = async () => {
    await fetch(
        `import.meta.env.VITE_API_URL/applications/${selectedApplication.id}/status`,
        {

            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                status:"Rejected"
            })

        }
    );

    getApplications();
    getLabour(selectedApplication.labourId);

}

const handleReport = async () => {

    if (!selectedApplication) return;

    await fetch(

        `import.meta.env.VITE_API_URL/applications/${selectedApplication.id}/status`,

        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },

            body: JSON.stringify({
                status: "Reported"
            })

        }

    );

    navigate(`/farmer-home/reportLabour/${selectedApplication.labourId}`);

}

const getLabour = async (id) => {

    try{

        const response = await fetch(
            `import.meta.env.VITE_API_URL/auth/users/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        if(!response.ok){
            throw new Error("Labour not found");
        }

        const data = await response.json();

        setSelectedLabour(data);

    }

    catch(error){

        console.log(error);

    }

}   

    return (

        <div>

            {/* Left */}

            <div className="applicationsTable">

                <h2>Job Applications</h2>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Job ID</th>

                            <th>Job Title</th>

                            <th>Labour ID</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            applications.map((labour) => (

                                <tr key={labour.id}>

                                    <td>{labour.id}</td>

                                    <td>{labour.jobId}</td>

                                    <td>{labour.jobTitle}</td>

                                    <td>{labour.labourId}</td>

                                    <td>{labour.status}</td>

                                    <td>

                                        <button

                                            className="btn btn-primary"

                                            onClick={() => {

                                                setSelectedApplication(labour);

                                                getLabour(labour.labourId);

                                            }}

                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {/* Right */}

            {/* <div className="detailsCard"> */}
                {
                    selectedLabour ? (
                        <div className="detailsCard">

                        <h3>

                            Labour Details

                        </h3>

                        <div className="detailsGrid">

                            <div>

                                <strong>

                                    ID

                                </strong>

                                <p>

                                   {selectedLabour?.id}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Name

                                </strong>

                                <p>

                                    {selectedLabour?.name}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Village

                                </strong>

                                <p>

                                    {selectedLabour?.village}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Skills

                                </strong>

                                <p>

                                   {selectedLabour?.skills}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Age

                                </strong>

                                <p>

                                    {selectedLabour?.age}

                                </p>

                            </div>
                            <div>

                                <strong>

                                    Email

                                </strong>

                                <p>

                                    {selectedLabour?.email}

                                </p>

                            </div>


                        </div>



                        <div className="buttonGroup">

                            <button className="rejectBtn" onClick={handleHire}>

                                Hire

                            </button>

                            <button className="deleteBtn" onClick={handleReject}>

                                Reject

                            </button>

                            <button className="deleteBtn" onClick={handleReport}>

                                Report User

                            </button>

                        </div>

                    </div>

                    ) : (
                        <h3>Select an application</h3>
                    )
                }

        </div>

    );

};

export default Applications;