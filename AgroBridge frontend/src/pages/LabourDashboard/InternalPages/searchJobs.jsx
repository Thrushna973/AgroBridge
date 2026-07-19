import React, { useEffect, useState } from "react";
import "./searchJobs.css";
import {
  Search,
  MapPin,
  IndianRupee,
  CalendarDays,
  Clock3,
  Users,
  Eye,
  Filter,
  Briefcase
} from "lucide-react";
import labourProfile from "../../../assets/labourProfile.jpg";

const searchJobs = () => {

  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedVillage, setSelectedVillage] = useState("");

  const [selectedFarmType, setSelectedFarmType] = useState("");

  const [selectedWorkType, setSelectedWorkType] = useState("");

  const [selectedSort, setSelectedSort] = useState("");

  const [loading, setLoading] = useState(true);

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

  const loadJobs = () => {

    fetch(

      "http://localhost:5000/api/jobs/labour",

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    )

      .then((res) => res.json())

      .then((data) => {

        setJobs(data);

        setFilteredJobs(data);
        console.log(data);

        setLoading(false);

      })

      .catch((err) => {

        console.log(err);

        setLoading(false);

      });

  };

  useEffect(() => {

    loadJobs();

  }, []);

  useEffect(() => {

    let updated = [...jobs];

    if (searchTerm !== "") {

      updated = updated.filter((job) =>

        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

        job.village.toLowerCase().includes(searchTerm.toLowerCase())

      );

    }

    if (selectedVillage !== "") {

      updated = updated.filter(

        (job) => job.village === selectedVillage

      );

    }

    if (selectedFarmType !== "") {

      updated = updated.filter(

        (job) => job.farmtype === selectedFarmType

      );

    }

    if (selectedWorkType !== "") {

      updated = updated.filter(

        (job) => job.worktype === selectedWorkType

      );

    }

    if (selectedSort === "Highest Wage") {

      updated.sort((a, b) => b.wage - a.wage);

    }

    if (selectedSort === "Lowest Wage") {

      updated.sort((a, b) => a.wage - b.wage);

    }

    if (selectedSort === "Newest") {

      updated.sort(

        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

      );

    }

    setFilteredJobs(updated);

  }, [

    jobs,

    searchTerm,

    selectedVillage,

    selectedFarmType,

    selectedWorkType,

    selectedSort

  ]);

  return (

    <div className="searchJobsContainer">

      <div>

          <h1 style = {{textAlign:"center", color:"#1d3b1d"}}>Search Jobs</h1>

          <p style = {{color:"#666"}}>

            Find the best agricultural jobs near you.

          </p>

      </div>

      <div className="searchBox">

        <Search className="searchIcon" />

        <input type="text" placeholder="Search by job title or village..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

      </div>

      <div className="filterContainer">

        <select value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)}>

          <option value="">All Villages</option>

          <option value="Kompally">Kompally</option>

          <option value="Ongole">Ongole</option>

          <option value="Guntur">Guntur</option>

        </select>

        <select value={selectedFarmType} onChange={(e) => setSelectedFarmType(e.target.value)}>

          <option value="">Farm Type</option>

          <option value="Paddy">Paddy</option>

          <option value="Cotton">Cotton</option>                            

          <option value="Vegetables">Vegetables</option>

          <option value="Groundnut">Groundnut</option>

        </select>

        <select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)}>

          <option value="">Work Type</option>

          <option value="Harvesting">Harvesting</option>

          <option value="Weeding">Weeding</option>

          <option value="Sowing">Sowing</option>

          <option value="Spraying">Spraying</option>

        </select>

        <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>

          <option value="">Sort By</option>

          <option>Newest</option>

          <option>Highest Wage</option>

          <option>Lowest Wage</option>

        </select>

      </div>

      <div className="jobCount">

        Showing <b>{filteredJobs.length}</b> Jobs

      </div>
      <div className = "jobsGridlayout">
          {loading ? (

          <div className="loadingJobs">

            <h3>Loading Jobs...</h3>

          </div>

          ) : filteredJobs.length === 0 ? (

          <div className="emptyJobs">

            <Briefcase size={70} />

            <h3>No Jobs Found</h3>

            <p>

              Try changing your search or filters.

            </p>

          </div>

        ) : (
          filteredJobs.map((job) => (

            <div className="jobCard" key={job.id}>

              <img src = {labourProfile} alt={job.title} className="jobImage"/>
              

              <div className="jobBody">

                <div className="jobTitleRow">

                  <h3>{job.title}</h3>

                  <span className="statusBadge">

                    {job.jobStatus}

                  </span>

                </div>

                <p className="farmName">

                  {job.farmName}

                </p>

                <div className="jobInfo">

                  <p>

                    <MapPin size={16} />

                    {job.village}

                  </p>

                </div>

                <div className="jobInfo">

                  <p>

                    <IndianRupee size={16} />

                    {job.wage}/day

                  </p>

                </div>

                <div className="jobInfo">

                  <p>

                    <CalendarDays size={16} />

                    {formatDate(job.startDate)}

                    {" - "}

                    {formatDate(job.endDate)}

                  </p>

                </div>

                <div className="jobInfo">

                  <p>

                    <Clock3 size={16} />

                    {job.workingHours}

                  </p>

                </div>

                <div className="jobInfo">

                  <p>

                    <Users size={16} />

                    {job.requiredWorkers}

                    {"Labourers Required"}

                  </p>

                </div>
                    
                <div className="jobButtons">

                  <button className="detailsBtn">

                    <Eye size={18} />

                    View Details

                  </button>

                  <button className={job.applied ? "appliedBtn" : "applyBtn"} disabled={job.applied}>

                    {job.applied

                      ? "Applied"

                      : "Apply Now"}

                  </button>

                </div>

              </div>

            </div>

          )))}
      </div>
          {/* src={`http://localhost:5000/uploads/${job.photo}`} */}

    </div>

  );

};

export default searchJobs;