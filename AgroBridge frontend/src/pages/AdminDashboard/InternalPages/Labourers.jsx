import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Farmers.css'

const Labourers = () => {
  const navigate = useNavigate();
  const [UsersData, setUsersData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = localStorage.getItem("token");

  function GetData() {
   fetch("http://localhost:5000/api/auth/users", {
    headers:{
      Authorization:`Bearer ${token}`
    }
   })
    .then(res => res.json())
    .then((data)=>{
        setUsersData(data);
    })
    .catch(err => console.log(err));
  };

  useEffect(()=>{
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
                        Authorization:`Bearer ${token}`
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
              Authorization:`Bearer ${token}`
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
  };

  const handleDelete = async (id) => {
    try{
      for (const id of selectedUsers) {
        await fetch(
          `http://localhost:5000/api/auth/users/${id}`,
          {
            method: "DELETE",
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
    }

    GetData();
  };

  return (
  <>
    <div className='permissionButtons'>
      <button className='btn btn-success' onClick = {handleApprove}>Approve</button>
      <button className='btn btn-success' onClick = {handleRejected}>Reject</button>
      <button className='btn btn-danger' onClick = {handleDelete}>Delete</button>
    </div>
    <div className='table-container'>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Age</th>                       
            <th>Village</th>
            <th>Skills</th>
            <th>Photo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {UsersData
          .filter((user) => user.role === "labourer")
          .map((user) => (
          <tr key={user.id}>
            <td className="nameAlign">
              <input id = {user.id} className="Checkbox" type = "checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleCheckboxChange(user.id)}></input>
              <label htmlFor={user.id}>{user.name}</label>
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.age}</td>
            <td>{user.village}</td>
            <td>{user.skills}</td>
            <td>{user.photo}</td>
            <td>{user.status}</td>
            <td><button className='btn btn-primary' onClick={() => navigate(`/admin-home/labourers/${user.id}`)}>View</button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </> 
  )
}

export default Labourers