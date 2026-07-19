import React, { useEffect, useState } from 'react'
import '../../AdminDashboard/InternalPages/Farmers.css'
import { useNavigate } from 'react-router-dom';

const AllJobs = () => {
    const navigate = useNavigate();
    const [UsersData, setUsersData] = useState([]);
    const token = localStorage.getItem("token");
    function GetData() {
        fetch(`import.meta.env.VITE_API_URL/jobs`,
            {
                headers:{
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


//     const handleCheckboxChange = (id) => {

//         setSelectedUsers((prev) => {

//             if (prev.includes(id)) {

//                 return prev.filter(userId => userId !== id);

//             }

//             return [...prev, id];

//     });

// };


//   const handleApprove = async () => {

//     try {

//         for (const id of selectedUsers) {

//             await fetch(
//                 `import.meta.env.VITE_API_URL/auth/users/${id}/status`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         status: "Approved"
//                     })
//                 }
//             );

//         }

//         GetData();

//         setSelectedUsers([]);

//     } catch (error) {

//         console.log(error);

//     }

// };
  
//   const handleRejected = async () => {
//     try {
//       for (const id of selectedUsers) {
//         await fetch(
//           `import.meta.env.VITE_API_URL/auth/users/${id}/status`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-type" : "application/json"
//             },
//             body: JSON.stringify({
//               status: "Rejected"
//             })
//           }
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     GetData();
//     setSelectedUsers([]);
//   };

//   const handleDelete = async () => {
//     try{
//         if (!window.confirm("Delete selected farmers?")) {
//         return;
//     }
//       for (const id of selectedUsers) {
//         await fetch(
//           `import.meta.env.VITE_API_URL/auth/users/${id}`,
//           {
//             method: "DELETE"
//           }
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     GetData();
//     setSelectedUsers([]);
//   };

    return (
    <>
        <div className='table-container'>
            <table className = "users-table">
                <thead>
                    <tr>
                        <th>Job ID</th>
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
                        <th>Distance</th>
                        <th>Food</th>
                        <th>Accommodation</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {UsersData                                          
                    .map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
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
                            <td>{user.distance} KM</td>
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

export default AllJobs;