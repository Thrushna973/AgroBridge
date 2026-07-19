import React, { useEffect, useState } from 'react'
import './Farmers.css'
import { useNavigate } from 'react-router-dom';

const VerifiedFarmers = () => {
    const navigate = useNavigate();
    const [UsersData, setUsersData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const token = localStorage.getItem("token");
    function GetData() {
        fetch("http://localhost:5000/api/auth/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then((data) => {
                setUsersData(data);
                console.log(data);
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Farm Type</th>
                        <th>Farm Size</th>
                        <th>No. of Workers</th>
                        <th>Photo</th>
                        <th>Village</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {UsersData                                          
                    .filter((user) => user.role === "farmer" && user.status === "Approved")
                    .map((user) => (
                        <tr key={user.id}>
                            <td className="nameAlign">
                                <input type = "checkbox" className="Checkbox" id = {user.id} checked = {selectedUsers.includes(user.id)} onChange={() => handleCheckboxChange(user.id)}/>
                                <label htmlFor={user.id}>{user.name}</label> 
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.farmtype}</td>
                            <td>{user.farmsize}</td>
                            <td>{user.noofworkers}</td>
                            <td className='user-photo'>{user.photo}</td>
                            <td>{user.village}</td>
                            <td>{user.status}</td>
                            <td><button className='btn btn-primary' onClick={() => navigate(`/admin-home/farmers/${user.id}`)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}

export default VerifiedFarmers;