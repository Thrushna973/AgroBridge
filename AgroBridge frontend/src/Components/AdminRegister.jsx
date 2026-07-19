import React, { useState } from 'react'

const AdminRegister = ({closePopUp}) => {
    const [adminData, setAdminData] = useState({
        email:"",
        password:"",
        role:""
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setAdminData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("email", adminData.email);
            formData.append("password", adminData.password);
            formData.append("role", adminData.role);

            const response = await fetch(
                "import.meta.env.VITE_API_URL/auth/register",
            {
                method: "POST",
                body: formData,
            }
            );

            const data = await response.json();
            console.log(data);

            if(response.ok) {
                alert("Admin Registration Successfull");

                console.log(data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);

            alert("Server Error");
        }
    };

  return (
    <div className='parent'>
            <form className='employerDetails' onSubmit={handleSubmit}>
                <button className='close-btn' onClick={closePopUp}>
                    ×                                                              
                </button>
                <h2>Admin Registration</h2>
                <div className='d-flex flex-row justify-content-center formFields'> 
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id = "email"  className = "nameInput employerFormInput" type='text' name='email' value={adminData.email} onChange={handleChange}/>
                        <br />
                        <label htmlFor='password'>Password</label>
                        <input id = "password"  className = "nameInput employerFormInput" type='text' name='password' value={adminData.password} onChange={handleChange}/>
                        <br />
                        <label htmlFor='role'>Role</label>
                        <input id = "role"  className = "nameInput employerFormInput" type='text' name='role' value={adminData.role} onChange={handleChange}/>
                        <br />
                        <button className='submitBtn'>Register</button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default AdminRegister