import React, { useState, useEffect } from 'react'
import "./EmployersRegister.css"                                    

const EmployersRegister = ({closePopUp}) => {
    const [employerData, setEmployerData] = useState({             
        name:"",
        email:"",
        password:"",
        role:"farmer",
        farmtype:"",
        village:"",
        farmsize:"",
        noofworkers:"",
        phone:"",
        photo:null
    });                                                            
                                                                    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setEmployerData((prevData) => ({                
            ...prevData, 
            [name]: value,
        }));

    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(!file) return;
        setEmployerData((prev) => ({...prev, photo: file}));
    };                                                                           
   

    const handleSubmit = async (e) => {

        e.preventDefault();

            try {
                const formData = new FormData();
                formData.append("name", employerData.name);
                formData.append("email", employerData.email);
                formData.append("password", employerData.password);
                formData.append("farmtype", employerData.farmtype);
                formData.append("village", employerData.village);
                formData.append("farmsize", employerData.farmsize);
                formData.append("noofworkers", employerData.noofworkers);
                formData.append("role", employerData.role);
                formData.append("phone", employerData.phone);
                if(employerData.photo){
                    formData.append("photo", employerData.photo);
                }
                const response = await fetch(
                "import.meta.env.VITE_API_URL/auth/register",
                {
                    method: "POST",
                    // headers: {
                    // "Content-Type": "application/json"
                    // },
                    body: formData,
                }
                );

                const data = await response.json();
                
              console.log(data);

                if (response.ok) {

                    alert("Employer Registration Successful");

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
                <h2>Employer Registration</h2>
                <div className='d-flex flex-row justify-content-center formFields'> 
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id = "name"  className = "nameInput employerFormInput" type='text' name='name' value={employerData.name} onChange={handleChange}/>
                        <br />
                        <label htmlFor='email'>Email</label>
                        <input id = "email"  className = "nameInput employerFormInput" type='email' name='email' value={employerData.email} onChange={handleChange}/>
                        <br />
                        <label htmlFor='password'>Password</label>
                        <input id = "password"  className = "nameInput employerFormInput" type='password' name='password' value={employerData.password} onChange={handleChange}/>
                        <br />
                        <label htmlFor='farmType'>Farm Type</label>
                        <input type='text' className = "farmTypeInput employerFormInput" id = "farmType" name='farmtype' value={employerData.farmtype} onChange={handleChange}/>
                        <br />
                        <label htmlFor='village'>Village</label>
                        <input type='text' className = "villageInput employerFormInput" id='village' name='village' value={employerData.village} onChange={handleChange}/>
                        <br />
                        <label htmlFor='farmSize'>Farm size</label>
                        <input id = "farmSize" className = "farmSizeInput employerFormInput" type="number" placeholder='In acres' name='farmsize' value={employerData.farmsize} onChange={handleChange}/>
                        <br />
                        <label htmlFor='noOfWorkers'>No. of Workers<br /> needed</label>
                        <input type='number' className='noofInput employerFormInput' id='noOfWorkers' name='noofworkers' value={employerData.noofworkers} onChange={handleChange}/>
                        <br />
                        <label htmlFor='phone'>Phone Number</label>
                        <input type='tel' className='noofInput employerFormInput' id='phone' name='phone' value={employerData.phone} onChange={handleChange}/>
                        <br />
                        <label htmlFor='photo'>Upload Photo</label>
                        <input type = "file" className='employerPhoto' id = "photo" name='photo' onChange={handleFileChange}/>
                        <br />
                        <button className='submitBtn'>Register</button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default EmployersRegister