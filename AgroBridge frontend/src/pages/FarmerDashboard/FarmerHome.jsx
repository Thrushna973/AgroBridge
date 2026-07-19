import React, {useState, useEffect} from 'react'
import paddy from '../../assets/paddy.png'
import LabourProfile from '../../assets/LabourProfile.jpg'
import Weeding from '../../assets/weeding.jpeg'
import graph_1 from '../../assets/graph 1.png'
import graph_2 from '../../assets/graph 2.png'
import piechart from '../../assets/piechart.png'
import './FarmerHome.css'
import { GiWheat } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io"
import { GiFertilizerBag } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { LuBaggageClaim } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import { ArrowRight , BriefcaseBusiness, Users, UserLock, CircleCheck, MapPin, CalendarDays, EllipsisVertical, ChevronDown  } from 'lucide-react';
import DropdownButton from '../../Components/DropdownButton.jsx';
import {useNavigate} from "react-router-dom"

const FarmerHome = () => {

    const navigate = useNavigate();
    const handleLogin = () =>{
        navigate("/farmer-home");
    }
    const token = localStorage.getItem("token");
    const [stats, setStats] = useState({

    activeJobs: 0,

    totalLabourers: 0,

    pendingApplications: 0,

    completedJobs: 0

    });

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

// const fetchDashboardStats = () => {

//     fetch(

//         "import.meta.env.VITE_API_URL/dashboard/stats",

//         {

//             headers: {

//                 Authorization: `Bearer ${token}`

//             }

//         }

//     )

//     .then(async (res) => {

//         const data = await res.json();

//         if (!res.ok) {

//             alert(data.message);

//             return;

//         }

//         setStats(data);
//         console.log(data);

//     })

//     .catch((err) => {

//         console.error(err);

//     });

// };

const [dashboard, setDashboard] = useState(null);

const fetchDashboard = async () => {

    try {

        const response = await fetch(

            "import.meta.env.VITE_API_URL/dashboard/farmer",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        setDashboard(data);
        

    }

    catch (err) {

        console.error(err);

    }

};

useEffect(() => {

    fetchDashboard();

}, []);
console.log(dashboard);
// useEffect(() => {

//     fetchDashboardStats();

// }, []);

const handleHire = async () => {

    await fetch(
        `import.meta.env.VITE_API_URL/applications/${selectedApplication.id}/status`,
        {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                status: "Accepted"
            })

        }
    );

    // getApplications();
    // getLabour(selectedApplication.labourId);

};

  return (
    <div className='FarmerHome'>

        <div className="FarmerStats">
            <div className="ActiveJobs">
                <h1>Active Jobs</h1>
                <div className='miniCard'>
                    <p className='number'>{dashboard?.stats.activeJobs}</p> 
                    <BriefcaseBusiness className='cardIcon'/>
                </div>
                <a href="#" className='ActiveJobsLink'>View All jobs <ArrowRight className='arrowIcon'/></a>   
            </div>

            <div className="TotalLabourersHired">
                <h1>Total Labourers Hired</h1>
                <div className='miniCard'>
                    <p className='number'>{dashboard?.stats.totalLabourers}</p> 
                    <Users className='cardIcon'/>
                </div>
                <p>Today</p>
            </div>

            <div className="PendingApplications">
                <h1>Pending Applications</h1>
                <div className='miniCard'>
                    <p className='number'>{dashboard?.stats.pendingApplications}</p> 
                    <UserLock className='userscardIcon'/>
                </div>
                <a href="#" className='PendingApplicationsLink'>Review now<ArrowRight className='arrowIcon'/></a>   
            </div>

            <div className="completedJobs">
                <h1>Completed Jobs</h1>
                <div className='miniCard'>
                    <p className='completeJobsnumber'>{dashboard?.stats.completedJobs}</p> 
                    <CircleCheck className='circlecheckIcon'/>
                </div>
                <p>This Month</p>  
            </div>
        </div>

        <div className='d-flex flex-row'>
            <div className='TodaysWorkers'>
                <div className='todaysHead'>
                    <h1>Today's Workers</h1>
                    <a href="#" className='viewAllLink'>View all</a>
                </div>
                
                {dashboard?.todayWorkers?.length === 0 ? (
                    <h5 style={{color:"grey", textAlign:'center', marginTop:"20px"}}>There are no workers for today yet!!</h5>
                ) : (
                dashboard?.todayWorkers.map((worker) =>(
                        <div key = {worker.id} className='d-flex flex-row workerProfileCard'>
                        <img  src={`http://localhost:5000/uploads/${worker.photo}`} alt='worker' className='workerImg' />
                        <div>
                            <span className='wrokername'>{worker.name}</span>
                            <p className="workerPara">{worker.title}</p>
                        </div>
                        <p className='workerTime'><MapPin className='locationIcon'/>{worker.checkIn}-{worker.checkOut}</p>
                        <button className='workerBtn'>{worker.status}</button>
                    </div>
                    
                )))}
                
            </div>

            <div className='pendingApplications'>
                <div className='pendingApplicationsHeader'>
                    <h1>Pending Applications</h1>
                    <a href='#'>View all</a>
                </div>
                <div className='workerApplications'>
                    {dashboard?.pendingApplications?.length === 0 ? (
                        <h5 style={{color:"grey", textAlign:'center', marginTop:"20px"}}>There are no pending Applications</h5>

                    ) : (
                    
                    dashboard?.pendingApplicationsList.map((application) => (
                        <div key = {application.id} className='d-flex flex-row workerProfileCard'>
                            <img  src={`http://localhost:5000/uploads/${application.photo}`} alt='worker' className='workerImg' />
                            <div>
                                <span className='wrokername'>{application.name}</span>
                                <p className="workerPara">{application.title} <br /></p>
                            </div>
                            <p className='workerTime'>Applied on {formatDate(application.appliedAt)}</p>
                            <button className='workerViewBtn' onClick={() => navigate("/farmer-home/applications")}>View</button>
                            <button className='shine-btn'>Accept</button>
                        </div>
                    )))}
                </div>
            </div>
        </div>

        <div className='d-flex flex-row'>
            <div className='jobListingsCard'>
                <div className='ListingsHead'>
                    <h1>My Job Listings</h1>
                    <a href="#" className='viewAllLink'>View all Jobs</a>
                </div>
                {!dashboard?.myJobs?.length  ? (
                        <h5 style={{color:"grey", textAlign:'center', marginTop:"20px"}}>There are no pending Applications</h5>
                ) : (  
                    dashboard?.myJobs.map((job) => (
                        <div key = {job.id} className='d-flex flex-row align-items-center jobListingProfileCard'>
                            {/* <img  src={`http://localhost:5000/uploads/${job.photo}`} alt='worker' className='jobListingImg' /> */}
                            <div>
                                <span className='wrokername'>{job.title}</span>
                                <p className="workerPara"><span ><CalendarDays className='loactionIcon'/>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span></p>
                            </div>
                            <div className='Moneydiv'>
                                <h5 className='wrokerMoney'>₹{job.wage}/day</h5>
                                <p className="workerPara">{job.requiredWorkers} Labourers</p>
                            </div>
                            <button className='AppliedBtn'>{job.appliedCount} Applied</button>
                            {/* <EllipsisVertical /> */}
                        </div>
                    )))}
            </div>
            <div className='labourersNearby'>
                <div className='pendingApplicationsHeader'>
                    <h1>Labourers Nearby</h1>
                    <a href='#'>View all</a>
                </div>
                {dashboard?.nearbyLabours?.length === 0 ? (
                        <h5 style={{color:"grey", textAlign:'center', marginTop:"20px"}}>There are no pending Applications</h5>
                ) : (
                    dashboard?.nearbyLabours?.map((labour) => (
                        <div className='workerApplications'>
                            <div className='d-flex flex-row workerProfileCard'>
                                <img  src={`http://localhost:5000/uploads/${labour.photo}`} alt='worker' className='workerImg' />
                                <div>
                                    <span className='wrokername'>{labour.name}</span>
                                    <p className="workerPara">{labour.village} <br /></p>
                                </div>
                                <div className='miniDiv'>
                                    <p> <br />
                                    <span className='nearbyMoney'>{labour.skills}</span></p>
                                </div>
                                <button className='shine-btn spacing'>Hire</button>
                            </div>
                        </div>
                    )))}
            </div>
        </div>
    </div>
  )
}

export default FarmerHome