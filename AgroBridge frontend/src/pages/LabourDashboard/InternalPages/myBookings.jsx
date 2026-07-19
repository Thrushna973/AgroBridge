import React, { useEffect, useState } from 'react';
import '../../AdminDashboard/InternalPages/Farmers.css';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {    
            
    const navigate = useNavigate();
    const [UsersData, setUsersData] = useState([]);

    function GetData() {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:5000/api/applications/my`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

            .then(res => res.json())
            .then((data) => {
                setUsersData(data);
                console.log(data);

                // const today = new Date();
                // const activeJobs = data.filter(job =>
                //     job.status === "open" &&
                //     new Date(job.enddate) >= today
                // );

                // const completedJobs = data.filter(job =>
                //     job.status === "completed" ||
                //     new Date(job.enddate) < today
                // );
            })
            .catch(err => console.log(err));

        
    }

    useEffect(() => {
        GetData();
    }, []);

    const formatDate = (date) => {

        const d = new Date(date);

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        return `${d.getDate()} ${months[d.getMonth()]}`;

    };
    return (
    <>
        <div className='table-container'>
            <table className = "users-table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Farm Name</th>
                        <th>Farmer Name</th>
                        <th>Village</th>
                        <th>Daily Wage</th>
                        <th>Application Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Working Hours</th>
                        <th>Application ID</th>
                        <th>Application Status</th>
                        <th>Job Status</th>
                    </tr>
                </thead>

                <tbody>
                    {UsersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.jobTitle}</td>
                            <td>{user.farmName}</td>
                            <td>{user.farmerName}</td>
                            <td>{user.village}</td>
                            <td>{user.wage}</td>                                   
                            <td>{formatDate(user.applicationDate)}</td>
                            <td>{formatDate(user.startDate)}</td>
                            <td>{formatDate(user.endDate)}</td>
                            <td>{user.workingHours}</td>
                            <td>{user.applicationId}</td>
                            <td>{user.applicationStatus}</td>
                            <td>{user.jobStatus}</td>
                            {/* <td><button className='btn btn-primary' onClick={() => navigate(`/admin-home/farmers/${user.id}`)}>View</button></td> */}
                        </tr> 
                    ))} 
                </tbody>
            </table>
        </div>
    </>
    )
}

export default MyBookings;