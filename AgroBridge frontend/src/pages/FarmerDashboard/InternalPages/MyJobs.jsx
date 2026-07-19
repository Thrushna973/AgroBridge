import React, { useEffect, useState } from 'react';
import '../../AdminDashboard/InternalPages/Farmers.css';
import { useNavigate } from 'react-router-dom';

const MyJobs = () => {    
            
    const navigate = useNavigate();
    const [UsersData, setUsersData] = useState([]);

    function GetData() {
        const token = localStorage.getItem("token");

        fetch(`import.meta.env.VITE_API_URL/jobs/my`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

            .then(res => res.json())
            .then((data) => {
                setUsersData(data);
                console.log(data);

                const today = new Date();
                const activeJobs = data.filter(job =>
                    job.status === "open" &&
                    new Date(job.enddate) >= today
                );

                const completedJobs = data.filter(job =>
                    job.status === "completed" ||
                    new Date(job.enddate) < today
                );
            })
            .catch(err => console.log(err));

        
    }

    useEffect(() => {
        GetData();
    }, []);

        
    return (
    <>
        <div className='table-container'>
            <table className = "users-table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Farm Type</th>
                        <th>Work Type</th>
                        <th>Village</th>
                        <th>Daily Wage</th>
                        <th>Required Workers</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Working Hours</th>
                        <th>Experience</th>
                        <th>Food</th>
                        <th>Accommodation</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {UsersData                                          
                    // .filter((user) => user.role === "farmer")
                    .map((user) => (
                        <tr key={user.id}>
                            <td>{user.title}</td>
                            <td>{user.farmtype}</td>
                            <td>{user.worktype}</td>
                            <td>{user.village}</td>
                            <td>{user.wage}</td>                                   
                            <td>{user.requiredworkers}</td>
                            <td>{user.startdate}</td>
                            <td>{user.enddate}</td>
                            <td>{user.workinghours}</td>
                            <td>{user.experience}</td>
                            <td>{user.food}</td>
                            <td>{user.accommodation}</td>
                            <td>{user.description}</td>
                            <td>{user.status}</td>
                            {/* <td><button className='btn btn-primary' onClick={() => navigate(`/admin-home/farmers/${user.id}`)}>View</button></td> */}
                        </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}

export default MyJobs;