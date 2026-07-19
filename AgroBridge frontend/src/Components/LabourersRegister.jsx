import React, { useState, useEffect } from 'react'
import './LabourersRegister.css'


const LabourersRegister = ({closeModal}) => {
    const [labourData, setLabourData] = useState({
        name:"",
        email:"",
        password:"",
        role:"labourer",
        age:"",
        village:"",
        skills:"",
        phone:"",
        photo:null
    });

    const handleChange = (e) => {
        const {name , value} = e.target;
        setLabourData((prevData) => ({                
            ...prevData, 
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
        setLabourData((prev) => ({...prev, photo: file}));
    }; 

   

       const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append("name", labourData.name);
                formData.append("email", labourData.email);
                formData.append("password", labourData.password);
                formData.append("village", labourData.village);
                formData.append("skills", labourData.skills);
                formData.append("role", labourData.role);
                formData.append("age", labourData.age);
                formData.append("phone", labourData.phone);
                if(labourData.photo) {
                    formData.append("photo", labourData.photo);
                }
                const response = await fetch(
                "import.meta.env.VITE_API_URL/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
                );

                const data = await response.json();
                
                console.log(data);

                if (response.ok) {

                    alert("Labour Registration Successful");

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
        <div className='labourParent'>                            
               <form className='labourDetails' onSubmit={handleSubmit}> 
                <button                                                  
                        className="close-btn"
                        onClick={closeModal}
                    >
                    ×
                </button>
                <h2>Labour Registration</h2> 
                <div className='d-flex flex-row justify-content-center'> 
                    <div>
                        <label htmlFor = "name">Name</label>
                        <input type='text' id='name' className='labourNameInput labourInput' name='name' value={labourData.name} onChange={handleChange}/>       
                        <br />         
                        <label htmlFor = "email">Email</label>
                        <input type='email' id='email' className='labourEmailInput labourInput' name='email' value={labourData.email} onChange={handleChange}/>       
                        <br />     
                        <label htmlFor = "password">Password</label>
                        <input type='password' id='password' className='labourPasswordInput labourInput' name='password' value={labourData.password} onChange={handleChange}/>
                        <br />    
                        <label htmlFor = "age">Age</label>
                        <input type = "text" className='ageinput labourInput' id = "age" name='age' value={labourData.age} onChange={handleChange}/>
                        <br />
                        <label htmlFor='village'>Village</label>
                        <input type = "text" className = 'villageinput labourInput' id = 'village' name='village' value={labourData.village} onChange={handleChange}/>
                        <br />
                        <label htmlFor='skills' className='skillsLabel'>Skills</label>
                        <textarea rows={5} cols={50} className='skillsinput' id='skills' name='skills' value={labourData.skills} onChange={handleChange}></textarea>
                        <br />
                        <label htmlFor='phone'>Phone Number</label>
                        <input type = "tel" className = 'villageinput labourInput' id = 'phone' name='phone' placeholder = "Enter Phone Number" value={labourData.phone} onChange={handleChange}/>
                        <br />
                        <label htmlFor='photo'>Upload Photo</label>
                        <input type='file' className='labourPhoto labourInput' id='photo' name='photo'  onChange={handlePhotoChange}/>
                        <br />
                        <div className='d-flex flex-row justify-content-center'>
                            <button className='submitBtn'>
                                Register
                            </button>
                        </div>       
                    </div> 
                </div>
            </form>
        </div>
)
};

export default LabourersRegister