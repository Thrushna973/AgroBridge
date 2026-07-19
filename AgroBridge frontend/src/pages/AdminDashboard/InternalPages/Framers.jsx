import React, { useEffect, useState } from 'react'
import './Farmers.css'
import { useNavigate } from 'react-router-dom';

const Framers = () => {
    const navigate = useNavigate();
    const [UsersData, setUsersData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const token = localStorage.getItem("token");

    const GetData = async () => {

    try {

        // const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/auth/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {

            throw new Error("Failed to fetch users.");

        }

        const data = await response.json();

        if(!response.ok){

    console.log(data);

    return;

}
        // console.log(data);

        setUsersData(data);

    } catch (err) {

        console.log(err);

    }

};

useEffect(() => {
    GetData();
}, []);


    const handleCheckboxChange = (id) => {

        setSelectedUsers((prev) => {

            if (prev.includes(id)) {

                return prev.filter(userId => userId !== id);

            }

            return [...prev, id];

    });

};


  const handleApprove = async () => {

    try {

        for (const id of selectedUsers) {

            await fetch(
                `http://localhost:5000/api/auth/users/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status: "Approved"
                    })
                }
            );

        }

        GetData();

        setSelectedUsers([]);

    } catch (error) {

        console.log(error);

    }

};
  
  const handleRejected = async () => {
    try {
      for (const id of selectedUsers) {
        await fetch(
          `http://localhost:5000/api/auth/users/${id}/status`,
          {
            method: "PUT",
            headers: {
              "Content-type" : "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              status: "Rejected"
            })
          }
        );
      }
    } catch (err) {
      console.log(err);
    }

    GetData();
    setSelectedUsers([]);
  };

  const handleDelete = async () => {
    try{
        if (!window.confirm("Delete selected farmers?")) {
        return;
    }
      for (const id of selectedUsers) {
        await fetch(
          `http://localhost:5000/api/auth/users/${id}`,
          {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
    }

    GetData();
    setSelectedUsers([]);
  };

    return (
    <>
        <div className='permissionButtons'>
            <button className='btn btn-success' onClick={handleApprove}>Approve</button>
            <button className='btn btn-success' onClick={handleRejected}>Reject</button>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
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
                    .filter((user) => user.role === "farmer")
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

export default Framers;