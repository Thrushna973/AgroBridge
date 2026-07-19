import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Farmers.css'

const ReportedJobs = () => {
  const navigate = useNavigate();
  const [UsersData, setUsersData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = localStorage.getItem("token");
  function GetData() {
   fetch("http://localhost:5000/api/reports",
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
   )
    .then(res => res.json())
    .then((data)=>{
        setUsersData(data);
        console.log(data);
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
  const handleUnderReview = async () => {

    try {

        for (const id of selectedUsers) {

            await fetch(
                `http://localhost:5000/api/reports/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: "Under Review"
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
  const handleResolved = async () => {

    try {

        for (const id of selectedUsers) {

            await fetch(
                `http://localhost:5000/api/reports/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: "Resolved"
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
          `http://localhost:5000/api/reports/${id}/status`,
          {
            method: "PUT",
            headers: {
              "Content-type" : "application/json"
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
            method: "DELETE"
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
      <button className='btn btn-warning' onClick = {handleUnderReview}>Under Review</button>
      <button className='btn btn-success' onClick = {handleResolved}>Resolve</button>
      <button className='btn btn-success' onClick = {handleRejected}>Reject</button>
      <button className='btn btn-danger' onClick = {handleDelete}>Delete</button>
    </div>
    <div className='table-container'>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Description</th>                       
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {UsersData
          .map((user) => (
          <tr key={user.id}>
            <td className="nameAlign">
              <input id = {user.id} className="Checkbox" type = "checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleCheckboxChange(user.id)}></input>
              <label htmlFor={user.id}>{user.jobId}</label>
            </td>
            <td>{user.reportedBy}</td>
            <td>{user.reason}</td>
            <td>{user.description}</td>
            <td>{user.status}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </> 
  )
}

export default ReportedJobs