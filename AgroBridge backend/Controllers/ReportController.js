const Report = require("../models/Report");
const xss = require("xss");


// Submit Report
exports.submitReport = (req, res) => {

    const reportData = req.body;

    reportData.reportedBy = req.user.id;

    if (reportData.reason) {
        reportData.reason = xss(reportData.reason.trim());
    }

    if (reportData.description) {
        reportData.description = xss(reportData.description.trim());
    }

    if (
        reportData.reportType === "Job" &&
        req.user.role !== "labourer"
    ) {

        return res.status(403).json({

            message:
            "Only labourers can report jobs."

        });

    }

    if (
        reportData.reportType === "User" &&
        req.user.role !== "farmer"
    ) {

        return res.status(403).json({

            message:
            "Only farmers can report labourers."

        });

    }

    reportData.evidence =
            req.file ? req.file.filename : null;

    if (
        !reportData.reportType ||
        !reportData.reportedBy ||
        !reportData.reason
    ) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    const validTypes = ["Job", "User"];

    if (!validTypes.includes(reportData.reportType)) {
        return res.status(400).json({
            message: "Invalid report type."
        });
    }
        // Job Report

        if (reportData.reportType === "Job") {

            if (!reportData.jobid) {

                return res.status(400).json({
                    message: "Job ID is required"
                });

            }

            reportData.reportedUserId = null;

        }

        // User Report

        if (reportData.reportType === "User") {

            if (!reportData.reportedUserId) {

                return res.status(400).json({
                    message: "Reported User ID is required"
                });

            }

            reportData.jobid = null;

        }
    
    // if(reportData.reportType==="Job"){

    //     Report.checkExistingJobReport(

    //     req.user.id,

    //     reportData.jobid,

    //     ...

    //     );

    // }

    // else{

    //     Report.checkExistingUserReport(

    //     req.user.id,

    //     reportData.reportedUserId,

    //     ...

    //     );

    // }

//     Report.checkExistingReport(

//     reportData.reportedBy,
//     reportData.reportedUserId,

//     (err, reports) => {

//         if (err) {

//             return res.status(500).json(err);

//         }

//         // Farmer has already reported this labour
//         if (reports.length > 0) {

//             return res.status(400).json({

//                 message:
//                     "You have already reported this labour. Please wait until the current report is resolved."

//             });

//         }

//         // No active report exists → Insert new report
//         Report.create(reportData, (err, result) => {

//             if (err) {

//                 return res.status(500).json(err);

//             }

//             res.status(201).json({

//                 message: "Report submitted successfully."

//             });

//         });

//     }

// );

// ===================== JOB REPORT =====================

if (reportData.reportType === "Job") {

    Report.getJobById(
        reportData.jobid,
            (err, job) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                if (job.length === 0) {
                    return res.status(404).json({
                        message: "Job not found."
                    });
                }

                        // Job exists
                        // Continue to duplicate check
                Report.checkExistingJobReport(

                    req.user.id,
                    reportData.jobid,

                        (err, reports) => {

                            if (err) {

                                return res.status(500).json({
                                    message: err.message
                                });

                            }

                            if (reports.length > 0) {

                                return res.status(400).json({

                                    message:
                                        "You have already reported this job. Please wait until the current report is resolved."

                                });

                            }

                            Report.create(reportData, (err) => {

                                if (err) {

                                    return res.status(500).json({
                                        message: err.message
                                    });

                                }

                                return res.status(201).json({

                                    message: "Job reported successfully."

                                });

                            });

                        }

                    );

                }
            );

    }

// ===================== USER REPORT =====================

            else if (reportData.reportType === "User") {

                Report.checkLabourExists(
                    reportData.reportedUserId,
                    (err, result) => {

                        if (err) {

                            return res.status(500).json({
                                message: err.message
                            });

                        }

                        if (result.length === 0) {

                            return res.status(400).json({
                                message: "You can only report labourers."
                            });

                        }

                        // Continue with duplicate check...
                        // Check whether the labour has ever worked for this farmer
                        Report.checkWorkedForFarmer(

                            req.user.id,
                            reportData.reportedUserId,

                            (err, attendance) => {

                                if (err) {

                                    return res.status(500).json({
                                        message: err.message
                                    });

                                }

                                if (attendance.length === 0) {

                                    return res.status(403).json({

                                        message:
                                        "This labour has never worked for you."

                                    });

                                }

                                // Continue duplicate check here...
                                Report.checkExistingUserReport(

                                    req.user.id,
                                    reportData.reportedUserId,

                                    (err, reports) => {

                                        if (err) {

                                            return res.status(500).json({
                                                message: err.message
                                            });

                                        }

                                        if (reports.length > 0) {

                                            return res.status(400).json({

                                                message:
                                                    "You have already reported this labour. Please wait until the current report is resolved."

                                            });

                                        }

                                        Report.create(reportData, (err) => {

                                            if (err) {

                                                return res.status(500).json({
                                                    message: err.message
                                                });

                                            }

                                            return res.status(201).json({

                                                message: "User reported successfully."

                                            });

                                        });

                                    }

                                );

                            }

                        );
                    }
                );
            }

};

// Get All Reports
exports.getAllReports = (req, res) => {

    Report.getAllReports((err, reports) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(reports);

    });

};

// Get Report By ID
exports.getReportById = (req, res) => {

    // const id = req.params.id;

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid Report ID"
        });
    }

    Report.getReportById(id, (err, report) => {

        if (err) {
            return res.status(500).json(err);
        }

        if(report.length===0){

            return res.status(404).json({

            message:"Report not found."

            });

        }

        res.json(report[0]);

        

    });

};

// Update Report Status
exports.updateStatus = (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    Report.updateStatus(id, status, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Report status updated successfully."
        });

    });

};

// Delete Report
exports.deleteReport = (req, res) => {

    const id = req.params.id;

    Report.deleteReport(id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Report deleted successfully."
        });

    });

};

exports.checkJobReportStatus = (req, res) => {

    const jobId = req.params.jobId;
    const labourId = req.user.id;

    Report.checkJobReportStatus(
        labourId,
        jobId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({

                reported: result.length > 0

            });

        }
    );

};