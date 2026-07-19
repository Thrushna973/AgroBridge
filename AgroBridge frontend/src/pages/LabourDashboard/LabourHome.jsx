import React, { useState, useEffect, useContext } from 'react'
import logo from "../../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io"
import "./LabourHome.css"
import labourProfile from "../../assets/labourProfile.jpg"
import { FaStar } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

 
const LabourHome = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const labourData = JSON.parse(localStorage.getItem("labourData"));
    const [jobData, setJobData] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState([]);
    const [selectedJob, setSelectedJob] = useState([]);
    const [search, setSearch] = useState("");
    const [apply, setApply] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [reported, setReported] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [todayJobs,setTodayJobs]=useState([]);
    // const [user, setUser] = useState(null);
    const {user} = useContext(AuthContext);
    console.log(user?.id);

    // function GetData() {
    //     fetch("http://localhost:5000/api/jobs", {
    //         headers:{
    //             Authorization:`Bearer ${token}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then((data) =>{
    //         setJobData(data);
    //         console.log(data);
    //         console.log(jobData.title);
    //     })
    // }

    // useEffect(() =>{
    //     GetData();
    // }, []);

//     const response = await fetch(

// "http://localhost:5000/api/jobs/labour",

// {

// headers:{

// Authorization:

// `Bearer ${localStorage.getItem("token")}`

// }

// }

// );

// const jobs=await response.json();

// setJobs(jobs);



    const fetchJobs = async () => {

        const response = await fetch(
            "http://localhost:5000/api/jobs/labour",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setJobData(data);
        console.log(data);

    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobData.filter(job => {

    const keyword = search.toLowerCase();

    return (

        job.title.toLowerCase().includes(keyword) ||

        job.farmtype.toLowerCase().includes(keyword) ||

        job.worktype.toLowerCase().includes(keyword) ||

        job.village.toLowerCase().includes(keyword) ||

        String(job.wage).includes(keyword)

    );

});

    const randomJobs = [];

    const usedIndexes = new Set();

    while (
        randomJobs.length < 4 &&
        usedIndexes.size < jobData.length
    ) {
        const index = Math.floor(Math.random() * jobData.length);

        if (!usedIndexes.has(index)) {
            usedIndexes.add(index);
            randomJobs.push(jobData[index]);
        }
    }

    
    const formatDate = (date) => {

        const d = new Date(date);

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        return `${d.getDate()} ${months[d.getMonth()]}`;

    };

    const jobsToDisplay =
    search.trim() === ""
        ? randomJobs
        : filteredJobs;
    

    const handleJobClick = (id) => {

    setSelectedJobId(id);

    const job = jobData.find(job => job.id === id);

    setSelectedJob(job);

};


useEffect(() => {

    const fetchReportStatus = async () => {

        try {

            const response = await fetch(

                `http://localhost:5000/api/reports/job/${selectedJob?.id}/status`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await response.json();

            setReported(data.reported);

        }

        catch (err) {

            console.log(err);

        }

    };

    fetchReportStatus();

}, [selectedJob?.id]);

const handleApply = async () => {

    const response = await fetch(
        "http://localhost:5000/api/applications",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },

            body:JSON.stringify({

                jobId:selectedJobId,
                jobTitle:selectedJob.title

            })
        }
    );

    const data = await response.json();

    if(response.ok){

        alert("Applied Successfully");

        await fetchJobs();

    }else{

        alert(data.message);

    }

};
const loadTodayJobs=()=>{

    fetch(

        "http://localhost:5000/api/jobs/today",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    )

    .then(res=>res.json())

    .then(data=>{

        setTodayJobs(data);
        console.log(data);

    });

};
useEffect(()=>{

    loadTodayJobs();

},[]);

  return (
    <>
        <div className='labourDashboard'>
                <div className='quickOverview'>  
                    <p>Quick Overview</p>
                    <div className='overviewItems'>
                        <div className='d-flex flex-row quickOverviewCard'>
                            <div>                             
                                <HiMiniUserGroup className='cardIcon'/>
                            </div>      
                            <div>
                                <p>32<br />            
                                <span className='cardName'>Jobs Nearby </span></p>
                            </div>
                        </div>
                        <div className='d-flex flex-row quickOverviewCard'>
                                <div>               
                                    <BsFileEarmarkCheck className='cardIcon'/>
                                </div>      
                                <div>
                                    <p>5<br />            
                                    <span className='cardName'>Applied</span></p>
                                </div>
                        </div>      
                        <div className='d-flex flex-row quickOverviewCard'>
                                <div>               
                                    <IoCheckmarkCircleOutline className='cardIcon'/>
                                </div>      
                                <div>
                                    <p>2<br />            
                                    <span className='cardName'>Confirmed</span></p>
                                </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column'>
                    <div className='d-flex flex-row'>
                       
                        <div className="searchJobsCard">

                            <div className="cardHeader">
                                <h2>Search Jobs</h2>
                                <button onClick={() => navigate('/labour-home/alljobs')}>View all</button>
                            </div>

                            <div className="searchBar">
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                                {jobsToDisplay.map((user) => (
                                <div className="jobDetails" key = {user.id} onClick={() => handleJobClick(user.id)}>
                                    <div>
                                        <h3>{user.title}</h3>
                                        <p>FarmType: {user.farmtype}</p>
                                        <p>WorkType: {user.worktype}</p>
                                    </div>
                                    <div>
                                        <div className="jobMeta">
                                            <span>📍 {user.distance} km</span>
                                            <span>📅 {formatDate(user.startdate)}</span>
                                            <span>👨‍🌾 {user.requiredworkers} Labourers</span>
                                        </div>
                                    </div>

                                    <button className="wageBtn">₹{user.wage}/day</button>
                                </div>
                                
                                ))}
                            
                        </div>
                        <div className="jobDetailsCard">

                            <div className="jobTitleCard">
                                <div className="farmLogo">
                                    🌾
                                </div>

                                <div className="farmInfo">
                                    <h2>{selectedJob?.title}</h2>
                                    <p>FarmType: {selectedJob?.farmtype}</p>
                                    <p>WorkType: {selectedJob?.worktype}</p>
                                    <span>📍 {selectedJob?.distance} km away</span>
                                </div>
                            </div>

                            <div className="wageCard">
                                <div className="wageIcon">💰</div>

                                <div>
                                    <h1>₹{selectedJob?.wage} <span>/ day</span></h1>
                                    <p>Daily Wage</p>
                                </div>
                            </div>

                            <div className="jobInfoSection">

                                <div className="infoRow">
                                    <span>📅 Date</span>
                                    <span>{formatDate(selectedJob?.startdate)} - {formatDate(selectedJob?.enddate)}</span>
                                </div>

                                <div className="infoRow">
                                    <span>🕒 Time</span>
                                    <span>{selectedJob?.workinghours}</span>
                                </div>

                                <div className="infoRow">
                                    <span>👨‍🌾 Labourers Needed</span>
                                    <span>{selectedJob?.requiredworkers}</span>
                                </div>

                                <div className="infoRow">
                                    <span>Skills Required</span>


                                    <div className="skills">
                                        <span>{selectedJob?.skills}</span>
                                        <span>Paddy Cutting</span>
                                        <span>Loading</span>
                                    </div>
                                </div>

                                <div className="infoRow">
                                    <span>📍 Location</span>
                                    <span>{selectedJob?.village} Village</span>
                                </div>

                                <div className="aboutWork">
                                    <h4>About the Work</h4>

                                    <p>
                                        {selectedJob?.description}
                                    </p>
                                </div>
                            </div>

                            <div className="jobActions">
                                {/* <button className="applyBtn" onClick={handleApply}>
                                    {apply ?  "Applied" : 'Apply Now'} 
                                </button> */}
                                {/* <p>{JSON.stringify(jobData)}</p> */}
                                <button
                                    className="applyBtn"
                                    onClick={handleApply}
                                    disabled={selectedJob?.applied}
                                >
                                    {selectedJob?.applied ? "Applied" : "Apply Now"}
                                </button>
                                

                                {/* <button className="callBtn">
                                    Call Farmer
                                </button> */}

                                <button disabled={reported} className={reported ? "reportBtn" : "reportBtn"} onClick={() => navigate(`/labour-home/reportjob/${selectedJob?.id}`)}>

                                    { reported ? "Reported" : "Report Job" }

                                </button>
                            </div> 

                        </div> 
                        
                    </div>
                    {/* <div className = "d-flex flex-row"> */}
                         <div className="todayJobsCard">

                            <div className="cardHeader">
                                <h2>Today's Jobs</h2>
                            </div>
                            {todayJobs.map((user) => (
                                <div className="jobDetails" key = {user.id} onClick={() => handleJobClick(user.id)}>
                                    <div>
                                        <h3>{user.title}</h3>
                                        <p>FarmType: {user.farmtype}</p>
                                        <p>WorkType: {user.worktype}</p>
                                    </div>
                                    <div>
                                        <div className="jobMeta">
                                            <span>📍 {user.distance} km</span>
                                            <span>📅 {formatDate(user.startdate)}</span>
                                            <span>👨‍🌾 {user.requiredworkers} Labourers</span>
                                        </div>
                                    </div>

                                    <button className="wageBtn">₹{user.wage}/day</button>
                                </div>
                                
                                ))}
                           
                        </div>
                        {/* <div className="profileCard">

                            <h2>My Profile</h2>

                            <div className="profileTop">

                                <div className="profileInfo">

                                    <img src="#" alt="" />

                                    <div>

                                        <h2>
                                            Ramesh Kumar ✅
                                        </h2>

                                        <p>+91 98765 43210</p>

                                        <p>Rajampet Village</p>

                                        <span>⭐ 4.8 (32 ratings)</span>

                                    </div>

                                </div>

                                <div className="statsContainer">

                                    <div className="statBox">
                                        <h4>Availability</h4>
                                        <p>Available Today</p>
                                        <button className="availabilityBtn">
                                            ON
                                        </button>
                                    </div>

                                    <div className="statBox">
                                        <h4>Experience</h4>
                                        <h3>3+ Years</h3>
                                    </div>

                                    <div className="statBox">
                                        <h4>Jobs Completed</h4>
                                        <h3>28</h3>
                                    </div>

                                </div>

                            </div>

                            <div className="skillsHeader">

                                <h3>My Skills</h3>

                                <a href="#">Edit</a>

                            </div>

                            <div className="skillsContainer">

                                <span>Harvesting</span>
                                <span>Weeding</span>
                                <span>Sowing</span>
                                <span>Cattle Care</span>
                                <span>Spraying</span>

                            </div>

                        </div> */}

                </div>
        </div>
    </>

  )
}

export default LabourHome