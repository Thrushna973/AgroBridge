import React, { useState, useContext } from "react";
import "./PostNewJob.css";
import { Users } from "lucide-react";
import {AuthContext} from "../../../context/AuthContext"

const PostNewJob = () => {
    const token = localStorage.getItem("token");
    const user = useContext(AuthContext);

    const [jobData, setJobData] = useState({
        title:"",
        farmtype:"Rice",
        worktype:"Harvesting",
        village:"",
        wage:"",
        requiredworkers:"",
        startdate:"",
        enddate:"",
        workinghours:"",
        experience:"",
        distance:"",
        food:"yes",
        accommodation:"yes",
        description:"",
        skills:"",
        photo:null
    });

    const handleChange = (e)=>{

        const {name,value} = e.target;

        setJobData(prev=>({
            ...prev,

            [name]:value

        }));

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(!file) return;
        setJobData((prev) => ({...prev, photo: file}));
    };

    const handleSubmit = async (e) => {

    e.preventDefault();
    
    // // const user = JSON.parse(localStorage.getItem("user"))
    // const payload = {
    //                 ...jobData,
    //                 farmerId: user.id
    //         };

    try {
        const formData = new FormData();
        formData.append("title", jobData.title);
        formData.append("farmtype", jobData.farmtype);
        formData.append("worktype", jobData.worktype);
        formData.append("village", jobData.village);
        formData.append("wage", jobData.wage);
        formData.append("requiredworkers", jobData.requiredworkers);
        formData.append("startdate", jobData.startdate);
        formData.append("enddate", jobData.enddate);
        formData.append("workinghours", jobData.workinghours);
        formData.append("experience", jobData.experience);
        formData.append("distance", jobData.distance);       
        formData.append("food", jobData.food);
        formData.append("accommodation", jobData.accommodation);
        formData.append("description", jobData.description);
        formData.append("skills", jobData.skills); 
        if(jobData.photo) {
            formData.append("photo", jobData.photo);
        }
        const response = await fetch(
            "http://localhost:5000/api/jobs",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            }
        );

        const data = await response.json();

        if(response.ok){
            alert("Job Posted Successfully");
            console.log(data);
        }
        else{
            // alert(data.message);
            alert(data.message || data.sqlMessage || "Something went wrong");
        }

    }
    catch(err){

        console.log(err);

    }

};

    return(

<div className="postJobPage">

    <form className="jobCard" onSubmit={handleSubmit}>

        <h2>Post New Job</h2>

        <div className="sectionTitle">
            Basic Information
        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Job Title</label>

                <input type="text" name="title" value = {jobData.title} onChange={handleChange} />

            </div>

            <div className="inputGroup">

                <label>Farm Type</label>

                <select name="farmtype" value={jobData.farmtype} onChange={handleChange}>

                    <option value = "Rice">Rice</option>
                    <option value = "Wheat">Wheat</option>
                    <option value = "Cotton">Cotton</option>
                    <option value = "Sugarcane">Sugarcane</option>

                </select>

            </div>

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Work Type</label>

                <select name="worktype" value={jobData.worktype} onChange={handleChange}>

                    <option value = "Harvesting">Harvesting</option>
                    <option value = "Weeding">Weeding</option>
                    <option value = "Sowing">Sowing</option>
                    <option value = "Spraying">Spraying</option>

                </select>

            </div>

            <div className="inputGroup">

                <label>Village</label>
                <input type="text" name="village" value={jobData.village} onChange={handleChange}/>

            </div>

        </div>

        <div className="sectionTitle">
            Job Details
        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Daily Wage</label>
                <input type="number" name="wage" value={jobData.wage} onChange={handleChange}/>

            </div>

            <div className="inputGroup">

                <label>Required Workers</label>
                <input type="number" name="requiredworkers" value = {jobData.requiredworkers} onChange={handleChange}/>

            </div>

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Start Date</label>

                <input
                type="date"
                name="startdate"
                value = {jobData.startdate}
                onChange={handleChange}
                />

            </div>

            <div className="inputGroup">

                <label>End Date</label>

                <input
                type="date"
                name="enddate"
                value = {jobData.enddate}
                onChange={handleChange}
                />

            </div>

        </div>

        <div className="inputGroup">

            <label>Working Hours</label>

            <input
            type="text"
            name="workinghours"
        value = {jobData.workinghours}
            placeholder="8 AM - 5 PM"
            onChange={handleChange}
            />

        </div>

        <div className="sectionTitle">

            Requirements

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Experience</label>

                <select
                name="experience"
                value = {jobData.experience}
                onChange={handleChange}
                >

                <option value = "Any">Any</option>
                <option value = "1 Year">1 Year</option>
                <option value= '2 Years'>2 Years</option>

                </select>

            </div>

            <div className="inputGroup">
                <label>Distance</label>
                <input type="number" name="distance" value = {jobData.distance} onChange={handleChange}/>
            </div>

            {/* <div className="inputGroup">

                <label>Gender Preference</label>

                <select
                name="gender"
                onChange={handleChange}
                >

                <option>Any</option>
                <option>Male</option>
                <option>Female</option>

                </select>

            </div> */}
            

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Food</label>

                <select
                name="food"
                value = {jobData.food}
                onChange={handleChange}
                >

                <option value="yes">yes</option>
                <option value='no'>no</option>

                </select>

            </div>

            <div className="inputGroup">

                <label>Accommodation</label>

                <select
                name="accommodation"
                value = {jobData.accommodation}
                onChange={handleChange}
                >

                <option value = "yes">yes</option>
                <option value = "no">no</option>

                </select>

            </div>

        </div>
        <div className='row'>
            <div className="inputGroup">
                <label>Skills</label>
                <input type="text" name="skills" value = {jobData.skills} onChange={handleChange}/>
            </div>

            <div className="inputGroup">
                <label>Upload Photo</label>
                <input type="file" name="photo" onChange={handleFileChange}/>
            </div>
        </div>

        <div className="inputGroup">

            <label>Description</label>

            <textarea
            rows="5"
            name="description"
            value = {jobData.description}
            onChange={handleChange}
            ></textarea>

        </div>



        <div className="buttons">

            <button
            type="reset"
            className="btn btn-secondary"
            >

            Cancel

            </button>

            <button
            type="submit"
            className="btn btn-success"
            >

            Post Job

            </button>

        </div>

    </form>

</div>

)

}

export default PostNewJob;