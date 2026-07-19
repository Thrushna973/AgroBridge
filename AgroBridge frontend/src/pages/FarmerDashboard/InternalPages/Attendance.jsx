import React, { useEffect, useState, useContext } from "react";
import "./Attendance.css";
import {AuthContext} from "../../../context/AuthContext";

import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaClock,
    FaSearch
} from "react-icons/fa";

const Attendance = () => {
    const token = localStorage.getItem("token");
    const {user} = useContext(AuthContext);
    // const labour = JSON.parse(localStorage.getItem("labour"));

    const [jobs, setJobs] = useState([]);

    const [selectedJob, setSelectedJob] = useState("");

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [search, setSearch] = useState("");

    const [summary, setSummary] = useState({

        total: 0,

        present: 0,

        absent: 0,

        halfDay: 0

    });

    const [labourers, setLabourers] = useState([]);
    const [attendance, setAttendance] = useState([]);

    const [history, setHistory] = useState([]);
    
    const [attendancePercentage, setAttendancePercentage] = useState(0);

    const [todayWages, setTodayWages] = useState(0);

    const handleAttendanceChange = (labourId, field, value) => {

        setLabourers(prev =>
            prev.map(labour =>
                labour.id === labourId
                    ? { ...labour, [field]: value }
                    : labour
            )
        );

    };

    useEffect(() => {

        fetch(`import.meta.env.VITE_API_URL/jobs/my`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

            .then(res => res.json())

            .then(data => {

                setJobs(data);
                console.log(data);

                if (data.length > 0) {

                    setSelectedJob(data[0].id);

                }

            })

            .catch(console.error);

    }, []);


    useEffect(() => {

    if (!selectedJob || !selectedDate || !token) return;

    fetch(`import.meta.env.VITE_API_URL/dashboard/${selectedJob}/${selectedDate}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);

            setSummary(data.summary);

            setLabourers(data.labourers);

            setHistory(data.history);

            setTodayWages(data.todayWages);
            console.log(todayWages);

            const percentage =
                data.summary.total === 0
                    ? 0
                    : (
                        (data.summary.present / data.summary.total) * 100
                    ).toFixed(1);

            setAttendancePercentage(percentage);
            console.log(data.labourers);

        })
        .catch(err => console.error(err));

}, [selectedJob, selectedDate]);
console.log(selectedJob);
console.log(selectedDate);

// useEffect(() =>{
//     fetch(`import.meta.env.VITE_API_URL/attendance/job/${selectedJob}`)
//     .then(res => res.json())
//     .then(data => {
//         setAttendance(data);

//     })
// },[selectedJob]);


// useEffect(() => {
//     const wages = attendance.reduce((total, attendanceRecord) => {
//                 const labour = labourers.find(
//                             l => l.id === attendanceRecord.labourId
//                         );

//                         if (!labour) return total;

//                         if (attendanceRecord.status === "Present") {
//                             return total + Number(labour.wage);
//                         }

//                         if (attendanceRecord.status === "Half Day") {
//                             return total + Number(labour.wage) / 2;
//                         }

//                         return total;

//             }, 0);
//     setTodayWages(wages);
// },[attendance, labourers]);



// useEffect(() => {

//     if (!selectedDate) {
//         setTodayWages(0);
//         return;
//     }

//     // Convert selected date to YYYY-MM-DD
//     const selected = new Date(selectedDate).toISOString().split("T")[0];

//     const wages = attendance.reduce((total, attendanceRecord) => {

//         // Convert attendance date to YYYY-MM-DD
//         const attendanceDate = new Date(attendanceRecord.attendanceDate)
//             .toISOString()
//             .split("T")[0];

//         // Ignore records from other dates
//         if (attendanceDate !== selected) {
//             return total;
//         }

//         const labour = labourers.find(
//             labour => Number(labour.id) === Number(attendanceRecord.labourId)
//         );

//         if (!labour) return total;

//         if (attendanceRecord.status === "Present") {
//             return total + Number(labour.wage);
//         }

//         if (attendanceRecord.status === "Half Day") {
//             return total + Number(labour.wage) / 2;
//         }

//         return total;

//     }, 0);

//     setTodayWages(wages);

// }, [attendance, labourers, selectedDate]);


    const filteredLabours = labourers.filter(

        labour =>

            labour.name

                .toLowerCase()

                .includes(search.toLowerCase())

            ||

            labour.village

                .toLowerCase()

                .includes(search.toLowerCase())

    );

    // const handleAttendanceChange = (index, field, value) => {

    // const updated = [...labourers];

    // updated[index][field] = value;

    // setLabourers(updated);

    // };

    const markAllPresent = () => {

    const updated = labourers.map(labour => ({

            ...labour,

            status: "Present",

            checkIn: "08:00",

            checkOut: "17:00"

        }));

        setLabourers(updated);

    };

    const markAllAbsent = () => {

    const updated = labourers.map(labour => ({

            ...labour,

            status: "Absent",

            checkIn: "",

            checkOut: ""

        }));

        setLabourers(updated);

    };

    const saveAttendance = () => {

    const payload = labourers.map(labour => ({

        jobId: selectedJob,

        labourId: labour.id,

        // farmerId: user.id,

        attendanceDate: selectedDate,

        status: labour.status || "Present",

        checkIn: labour.checkIn || null,

        checkOut: labour.checkOut || null,

        remarks: labour.remarks || ""

    }));
    console.log(payload);

    fetch("import.meta.env.VITE_API_URL/attendance/bulk", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify(payload)

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

    })

    .catch(console.error);

    };

    

    return (

        <div className="attendancePage">

            <h2 className="attendanceTitle">

                Attendance Management

            </h2>

            <div className="summaryCards">

                <div className="summaryCard">

                    <FaUsers />

                    <div>

                        <h3>

                            {summary.total}

                        </h3>

                        <p>

                            Total Labourers

                        </p>

                    </div>

                </div>

                <div className="summaryCard present">

                    <FaUserCheck />

                    <div>

                        <h3>

                            {summary.present}

                        </h3>

                        <p>

                            Present

                        </p>

                    </div>

                </div>

                <div className="summaryCard absent">

                    <FaUserTimes />

                    <div>

                        <h3>

                            {summary.absent}

                        </h3>

                        <p>

                            Absent

                        </p>

                    </div>

                </div>

                <div className="summaryCard halfday">

                    <FaClock />

                    <div>

                        <h3>

                            {summary.halfDay}

                        </h3>

                        <p>

                            Half Day

                        </p>

                    </div>

                </div>

            </div>

            <div className="attendanceStatistics">

                <div className="statisticsCard">

                    <h4>

                        Attendance %

                    </h4>

                    <h2>

                        {attendancePercentage}%

                    </h2>

                </div>

                <div className="statisticsCard">

                    <h4>

                        Today's Wages

                    </h4>

                    <h2>

                        ₹{todayWages}

                    </h2>

                </div>

            </div> 
            
            <div className="attendanceFilters">

                <select

                    value={selectedJob}

                    onChange={(e) =>

                        setSelectedJob(e.target.value)

                    }

                >

                    {

                        jobs.map(job => (

                            <option

                                key={job.id}

                                value={job.id}

                            >

                                {job.title}

                            </option>

                        ))

                    }

                </select>

                <input

                    type="date"

                    value={selectedDate}

                    onChange={(e) =>

                        setSelectedDate(

                            e.target.value

                        )

                    }

                />

                <div className="searchBox">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Labour..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>
           

             {/* <div className="attendanceTable">

                <h3>

                    Labour Attendance

                </h3>

                 <p>

                    Attendance table will come in Part 3.2

                </p> 

            </div>   */}
                         
            <div className="attendanceTable">

                <div className="tableHeader">

                    <h3>

                        Labour Attendance

                    </h3>

                    <div className="tableButtons">

                        <button

                            className="presentBtn"

                            onClick={markAllPresent}

                        >

                            Mark All Present

                        </button>

                        <button

                            className="absentBtn"

                            onClick={markAllAbsent}

                        >

                            Mark All Absent

                        </button>

                    </div>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Village</th>

                            <th>Skills</th>

                            <th>Status</th>

                            <th>Check In</th>

                            <th>Check Out</th>

                            <th>Remarks</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredLabours.map((labour,index)=>(
                                // handleAttendanceChange(index, ...)

                                <tr key={labour.id}>

                                    <td>

                                        {labour.name}

                                    </td>

                                    <td>

                                        {labour.village}

                                    </td>

                                    <td>

                                        {labour.skills}

                                    </td>

                                    <td>

                                        <select

                                            value={labour.status || "Present"}

                                            onChange={(e)=>

                                                handleAttendanceChange(
                                                    labour.id,
                                                    "status",
                                                    e.target.value
                                                )
                                            }

                                        >

                                            <option>

                                                Present

                                            </option>

                                            <option>

                                                Absent

                                            </option>

                                            <option>

                                                Half Day

                                            </option>

                                        </select>

                                    </td>

                                    <td>

                                        <input

                                            type="time"

                                            value={labour.checkIn || ""}

                                            onChange={(e)=>

                                                handleAttendanceChange(

                                                    labour.id,

                                                    "checkIn",

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </td>

                                    <td>

                                        <input

                                            type="time"

                                            value={labour.checkOut || ""}

                                            onChange={(e)=>

                                                handleAttendanceChange(

                                                    labour.id,

                                                    "checkOut",

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </td>

                                    <td>

                                        <input

                                            type="text"

                                            value={labour.remarks || ""}

                                            placeholder="Remarks"

                                            onChange={(e)=>

                                                handleAttendanceChange(

                                                    labour.id,

                                                    "remarks",

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

                <div className="attendanceActions">

                    <button

                        className="saveAttendanceBtn"

                        onClick={saveAttendance}

                    >

                        Save Attendance

                    </button>

                </div>

            </div> 

            <div className="historyCard">

                <div className="historyHeader">

                    <h3>

                        Attendance History

                    </h3>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Total</th>

                            <th>Present</th>

                            <th>Absent</th>

                            <th>Half Day</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            history.map(item=>(

                                <tr

                                    key={item.attendanceDate}

                                >

                                    <td>

                                        {item.attendanceDate}

                                    </td>

                                    <td>

                                        {item.total}

                                    </td>

                                    <td>

                                        {item.present}

                                    </td>

                                    <td>

                                        {item.absent}

                                    </td>

                                    <td>

                                        {item.halfDay}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div> 

        </div>

    );

};

export default Attendance;