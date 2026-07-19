import React, { useState, useEffect } from "react";
import "./Reports.css";

const Reports = () => {

    const [reportsData, setReportsData] = useState([]);
    const token = localStorage.getItem("token");
    function GetData() {
        fetch("http://localhost:5000/api/reports",
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                    }

                    return response.json();
            })
            .then((data) => {
                setReportsData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching reports:", error);
            });
    }

    useEffect(() => {
        GetData();
    }, []);
    const handleResolve = async () => {
    await fetch(
        `http://localhost:5000/api/reports/${selectedReport?.id}/status`,
        {

            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:"Resolved"
            })

        }
    );

    GetData();
    // getApplications();
    // getLabour(selectedApplication.labourId);

}
    const handleReject = async () => {
    await fetch(
        `http://localhost:5000/api/reports/${selectedReport?.id}/status`,
        {

            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:"Rejected"
            })

        }
    );

    GetData();
    // getApplications();
    // getLabour(selectedApplication.labourId);

}

    const [selectedReport, setSelectedReport] = useState(null);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const filteredReports = reportsData.filter((report) => {

        const matchSearch =
            // report.reportedBy.includes(search) 
            String(report.reportedBy).includes(search) ||
            report.reportType.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === "All" ||
            report.status === filter;

        return matchSearch && matchFilter;

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

        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

    };

    return (

        <div className="reportsPage">

            <h2 className="pageTitle">
                Reports
            </h2>

            <div className="topBar">

                <input
                    type="text"
                    placeholder="Search Reports..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >

                    <option>All</option>

                    <option>Pending</option>

                    <option>Resolved</option>

                    <option>Rejected</option>

                </select>

            </div>

            <div className="tableCard">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Type</th>

                            <th>Reported By</th>

                            <th>Date</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredReports.map((report) => (

                                <tr key={report.id}>

                                    <td>{report.id}</td>

                                    <td>{report.reportType}</td>

                                    <td>{report.reportedBy}</td>

                                    <td>{formatDate(report.createdAt)}</td>

                                    <td>

                                        <span
                                            className={`status ${report.status}`}
                                        >

                                            {report.status}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="viewBtn"
                                            onClick={() =>
                                                setSelectedReport(report)
                                            }
                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {

                selectedReport && (

                    <div className="detailsCard">

                        <h3>

                            Report Details

                        </h3>

                        <div className="detailsGrid">

                            <div>

                                <strong>

                                    Report ID

                                </strong>

                                <p>

                                    {selectedReport.id}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Report Type

                                </strong>

                                <p>

                                    {selectedReport?.reportType}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Reported By

                                </strong>

                                <p>

                                    {selectedReport?.reportedBy}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Date

                                </strong>

                                <p>

                                    {formatDate(selectedReport?.createdAt)}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Reason

                                </strong>

                                <p>

                                    {selectedReport?.reason}

                                </p>

                            </div>

                            <div>

                                <strong>

                                    Evidence

                                </strong>

                                <p>

                                    {selectedReport?.evidence || "null"} 

                                </p>

                            </div>

                        </div>

                        <div className="description">

                            <strong>

                                Description

                            </strong>

                            <p>

                                {selectedReport.description}

                            </p>

                        </div>

                        <div className="buttonGroup">

                            <button className="resolveBtn" onClick={handleResolve}>

                                Resolve

                            </button>

                            <button className="rejectBtn" onClick={handleReject}>

                                Reject

                            </button>

                        </div>

                    </div>

                )

            }

        </div>

    );

};

export default Reports;