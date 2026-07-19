import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import { BiDollarCircle } from "react-icons/bi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdSupport } from "react-icons/md";
import graph_3 from '../../assets/graph-3.png'
import piechart from '../../assets/piechart2.png'
import { RiUser3Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { HiDocumentReport } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import map from '../../assets/map.jpg'

import {  Users, UserRound, Briefcase, CheckCircle,  } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { TbSquareRoundedCheck  } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [totalReports, setTotalReports] = useState(0);
    const [jobReports, setJobReports] = useState(0);
    const [userReports, setUserReports] = useState(0);
    const [resolvedReports, setResolvedReports] = useState(0);

    const [regionWiseJobs, setRegionWiseJobs] = useState({});
    const [skillPercentages, setSkillPercentages] = useState({});
    const [skillCounts, setSkillCounts] = useState({});
    const Percentages = {};

    const [farmersCount, setFarmersCount] = useState(0);
    const [laboursCount, setLaboursCount] = useState(0);

    const [activeJobs, setActiveJobs] = useState(0);
    const [completedJobs, setCompletedJobs] = useState(0);
    
    const [dashboardStats, setDashboardStats] = useState({});

    const [activities, setActivities] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() =>{
        fetch("import.meta.env.VITE_API_URL/dashboard/recent-activity",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

        .then(res => res.json())

        .then(data => {
            setActivities(data.slice(0, 5));
            console.log(data);
        })

        .catch(console.error);

        }, []);

    useEffect(() => {
        fetch("import.meta.env.VITE_API_URL/admin/dashboard",
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(data => {

                setDashboardStats(data);
                console.log(data);

            });

    }, []);

    useEffect(() => {
        fetch("import.meta.env.VITE_API_URL/reports",
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data);

                setTotalReports(data.length);

                setJobReports(data.filter((report) => report.reportType ==="Job").length);

                setUserReports(data.filter((report) => report.reportType ==="User").length);

                setResolvedReports(data.filter((report) => report.status === "Resolved").length);
                
            })
            .catch((error) => {
                console.error("Error fetching reports:", error);
            })
    }, []);

    useEffect(() => {          
        fetch("import.meta.env.VITE_API_URL/jobs",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data);      
                const counts = {};
                const skills = {};

            data.forEach(job => {

                counts[job.village] = (counts[job.village] || 0) + 1;
                skills[job.worktype] = (skills[job.worktype] || 0) + 1;

            });

            setRegionWiseJobs(counts);
            setSkillCounts(skills);                               


            const totalJobs = data.length;

            Object.entries(skills).forEach(([skill, count]) => {

                Percentages[skill] = (
                    parseInt((count / totalJobs) * 100))
            });

            console.log(Percentages);


            const activeJobs = data.filter(jobs => jobs.status === "open").length;
            const completedJobs = data.filter(jobs => jobs.status === "completed").length;
            setActiveJobs(activeJobs);
            setCompletedJobs(completedJobs);


            const latestJobs = data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);

            setRecentJobs(latestJobs);
            console.log(latestJobs);


            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            })

            setSkillPercentages(Percentages);

    }, []);


    const timeAgo = (date) => {

    const seconds = Math.floor(

        (new Date() - new Date(date)) / 1000

    );

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    if (minutes < 60)

        return `${minutes}m ago`;

    if (hours < 24)

        return `${hours}h ago`;

    return `${days}d ago`;

    };
 return (
    <div className="dashboard-layout"> 
      <div className="dashboard-content">
        <div className='d-flex flex-row stats'>
            <div className="dashboard-card farmer-card">
                <p>Total Farmers</p>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h2>{dashboardStats.totalFarmers}</h2>
                    <div className="statsicon">
                        <FaRegUser size={28} />
                    </div>
                    
                </div>

                <div >
                   <span>+{dashboardStats.farmersThisWeek} this week</span>
                </div>
            </div>
            <div className="dashboard-card farmer-card">
                <p>Total Labours</p>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h2>{dashboardStats.totalLabourers}</h2>
                    <div className="statsicon">
                        <Users size={28} />
                    </div>
                    
                </div>

                <div >
                   <span>+{dashboardStats.labourersThisWeek} this week</span>
                </div>
            </div>
            <div className="dashboard-card farmer-card">
                <p>Active Jobs</p>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h2>{dashboardStats.activeJobs}</h2>
                    <div className="statsicon">
                        <MdOutlineLocalPostOffice  size={28} />
                    </div>
                    
                </div>

                <div >
                   <span>+{dashboardStats.activeJobsThisWeek} this week</span>
                </div>
            </div>
            <div className="dashboard-card farmer-card">
                <p>Completed Jobs</p>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h2>{dashboardStats.completedJobs}</h2>
                    <div className="statsicon">
                        <TbSquareRoundedCheck  size={28} />
                    </div>
                    
                </div>

                <div >
                   <span>+{dashboardStats.completedJobsThisWeek} this week</span>
                </div>
            </div>
            
        </div>


        <div className="bottomCards">

            {/* Recent Jobs */}
            <div className="dashboardCard">
                <div className="cardTop">
                <h3>Recent Jobs</h3>
                <button onClick={() => navigate("/admin-home/allJobs")}>View all</button>
                </div>
                {recentJobs.map(job => (
                    <div className="jobItem">
                        <div >
                            <h4>{job.title}</h4>
                            <div>
                                <span className="jobdet">{job.requiredworkers} Labours</span>
                                <span className="jobdet">₹{job.wage}/day</span>
                                <span className="jobdet">{timeAgo(job.createdAt)}</span>
                            </div>

                            <div className="jobMeta">
                                <p>{job.workinghours} Hours Work • {job.village}</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}

            </div>

            {/* Recent Activity */}
            <div className="dashboardCard">
                <div className="cardTop">
                <h3>Recent Activity</h3>
                </div>

                <div className="activityList">
                    
                    {activities.map(activity => (

                        <div className="activityItem" key={`${activity.type}-${activity.id}`}>

                            <div className="activityIcon">

                               <div className = "activitygreen"> {activity.type === "Farmer" && <RiUser3Line /> } </div>

                                <div className= "activitygreen">{activity.type === "Labour" && <HiUsers />} </div>

                                <div className="activityred">{activity.type === "Job" && <HiDocumentReport />} </div>


                            </div>

                            <div className="activityContent">

                                <h5>

                                    {activity.title}

                                </h5>

                                <p>

                                    {activity.description}

                                </p>

                            </div>

                            <small>

                                {timeAgo(activity.createdAt)}

                            </small>

                        </div>

                    ))
                }

                </div>
            </div>

            {/* Top Skills in Demand */}                   
                <div className="analyticsCard">
                    <h3>Top Skills in Demand</h3>

                    {Object.entries(skillPercentages).map(([skill, percentage]) => (
                        <div className="skillItem" key={skill}>      
                            <span>{skill}</span>
                            <div className="progressBar"> 
                                <div className="progress" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span>{percentage}%</span>
                        </div>
                    ))}
                </div>
        </div>

        <div className="analyticsCards">

                {/* Region Wise Jobs */}
                <div className="analyticsCard lastcards">
                    <h3>Region Wise Jobs</h3>

                    <div className="regionContent">
                    <img
                        src={map}
                        alt="Map"
                        className="regionMap"
                    />

                    <div className="regionList">

                        {Object.entries(regionWiseJobs).map(([village, count]) => {
                            return (
                                <div className="regionRow" key={village}>
                                    <span>{village}</span>
                                    <strong>{count}</strong>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                </div>

                {/* Reports Summary */}
                <div className="analyticsCard lastcards">
                    <div className="cardHeader">
                        <h3>Reports Summary</h3>
                        <button onClick={() => navigate("/admin-home/allreports")}>View all</button>
                    </div>

                    <div className="reportItem">
                        <div className="reportLeft">
                            <div className="reportIcon"><HiDocumentReport /></div>
                            <span>Total Reports</span>
                        </div>
                        <strong>{totalReports}</strong>
                    </div>

                    <div className="reportItem">
                        <div className="reportLeft">
                            <div className="reportIcon"><RiUser3Line /></div>
                            <span>Jobs Reported</span>
                        </div>
                        <strong>{jobReports}</strong>
                    </div>

                    <div className="reportItem">
                        <div className="reportLeft">
                            <div className="reportIcon warning"><HiUsers /></div>
                            <span>Users Reported</span>
                        </div>
                        <strong>{userReports}</strong>
                    </div>

                    <div className="reportItem">
                        <div className="reportLeft">
                            <div className="reportIcon"><HiDocumentReport /></div>
                            <span>Resolved Reports</span>
                        </div>
                        <strong>{resolvedReports}</strong>
                    </div>
                </div>

            </div>
      </div>
    </div>
  );
}

export default AdminHome;