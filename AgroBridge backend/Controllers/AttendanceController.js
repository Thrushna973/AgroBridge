const Attendance = require("../models/Attendence");

const validateAttendance = (attendance, farmerId, callback) => {

    // Logged-in farmer
    attendance.farmerId = farmerId;

    // ===========================
    // Required Fields Validation
    // ===========================

    if (
        !attendance.jobId ||
        !attendance.labourId ||
        !attendance.attendanceDate ||
        !attendance.status
    ) {
        return callback("All required fields are mandatory.");
    }

    // ===========================
    // Status Validation
    // ===========================
    console.log(attendance.status);

    const validStatus = [
        "Present",
        "Absent",
        "Half Day"
    ];

    if (!validStatus.includes(attendance.status)) {
        return callback("Invalid attendance status.");
    }

    // ===========================
    // Check In / Check Out Validation
    // ===========================

    if (attendance.checkIn && attendance.checkOut) {

        const checkIn = new Date(`1970-01-01T${attendance.checkIn}`);
        const checkOut = new Date(`1970-01-01T${attendance.checkOut}`);

        if (checkOut <= checkIn) {
            return callback(
                "Check-out time must be later than check-in time."
            );
        }

    }

    // ===========================
    // Verify Farmer Owns Job
    // ===========================

    Attendance.checkJobOwnership(
        attendance.jobId,
        farmerId,
        (err, jobs) => {

            if (err) {
                return callback("Database error.");
            }

            if (jobs.length === 0) {
                return callback(
                    "You are not authorized to mark attendance for this job."
                );
            }

            const job = jobs[0];

            // ===========================
            // Job Status Validation
            // ===========================

            if (
                job.status === "Completed" ||
                job.status === "Cancelled"
            ) {

                return callback(
                    "Attendance cannot be marked for completed or cancelled jobs."
                );

            }

            // ===========================
            // Attendance Date Validation
            // ===========================

            const attendanceDate = new Date(attendance.attendanceDate);
            const startDate = new Date(job.startDate);
            const endDate = new Date(job.endDate);

            if (
                attendanceDate < startDate ||
                attendanceDate > endDate
            ) {

                return callback(
                    "Attendance date must be within the job duration."
                );

            }

            // ===========================
            // Verify Accepted Labour
            // ===========================

            Attendance.checkAcceptedLabour(
                attendance.jobId,
                attendance.labourId,
                (err, applications) => {

                    if (err) {
                        return callback("Database error.");
                    }

                    if (applications.length === 0) {

                        return callback(
                            "This labour was not accepted for this job."
                        );

                    }

                    // ===========================
                    // Duplicate Attendance Check
                    // ===========================

                    Attendance.checkAttendance(
                        attendance.jobId,
                        attendance.labourId,
                        attendance.attendanceDate,
                        (err, records) => {

                            if (err) {
                                return callback("Database error.");
                            }

                            if (records.length > 0) {

                                return callback(
                                    "Attendance has already been marked."
                                );

                            }

                            // ===========================
                            // All Valid
                            // ===========================

                            callback(null);

                        }
                    );

                }
            );

        }
    );

};

exports.getAcceptedLabours = (req, res) => {

    Attendance.getAcceptedLabours(

        req.params.jobId,

        (err, result) => {

            if (err)

                return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.markAttendance = (req, res) => {

    const attendance = req.body;

    // Logged-in farmer
    attendance.farmerId = req.user.id;

    // ===========================
    // Required Fields Validation
    // ===========================

    if (
        !attendance.jobId ||
        !attendance.labourId ||
        !attendance.attendanceDate ||
        !attendance.status
    ) {
        return res.status(400).json({
            message: "All required fields are mandatory."
        });
    }

    // ===========================
    // Status Validation
    // ===========================

    const validStatus = [
        "Present",
        "Absent",
        "Half Day"
    ];

    if (!validStatus.includes(attendance.status)) {
        return res.status(400).json({
            message: "Invalid attendance status."
        });
    }

    // ===========================
    // Check In / Check Out Validation
    // ===========================

    if (attendance.checkIn && attendance.checkOut) {

    const checkIn = new Date(`1970-01-01T${attendance.checkIn}`);
    const checkOut = new Date(`1970-01-01T${attendance.checkOut}`);

    if (checkOut <= checkIn) {

        return res.status(400).json({
            message: "Check-out must be later than check-in."
        });

    }

    }

    // ===========================
    // Verify Farmer Owns Job
    // ===========================

    Attendance.checkJobOwnership(
        attendance.jobId,
        attendance.farmerId,
        (err, jobs) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (jobs.length === 0) {
                return res.status(403).json({
                    message: "You are not authorized to mark attendance for this job."
                });
            }

            Attendance.checkJobDates(
                attendance.jobId,
                (err, jobs) => {

                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    const job = jobs[0];

                    if (
                        job.status === "Completed" ||
                        job.status === "Cancelled"
                    ) {

                        return res.status(400).json({
                            message:
                            "Attendance cannot be marked for completed or cancelled jobs."
                        });

                    }

                    const attendanceDate = new Date(attendance.attendanceDate);
                    const startDate = new Date(job.startDate);
                    const endDate = new Date(job.endDate);

                    if (
                        attendanceDate < startDate ||
                        attendanceDate > endDate
                    ) {

                        return res.status(400).json({
                            message:
                            "Attendance date must be within the job duration."
                        });

                    }

                    // Continue...
                    // ===========================
                        // Verify Labour Accepted
                        // ===========================

                        Attendance.checkAcceptedLabour(
                            attendance.jobId,
                            attendance.labourId,
                            (err, applications) => {

                                if (err) {
                                    return res.status(500).json({
                                        message: err.message
                                    });
                                }

                                if (applications.length === 0) {
                                    return res.status(400).json({
                                        message: "This labour is not accepted for this job."
                                    });
                                }

                                // ===========================
                                // Duplicate Attendance Check
                                // ===========================

                                Attendance.checkAttendance(
                                    attendance.jobId,
                                    attendance.labourId,
                                    attendance.attendanceDate,
                                    (err, records) => {

                                        if (err) {
                                            return res.status(500).json({
                                                message: err.message
                                            });
                                        }

                                        if (records.length > 0) {
                                            return res.status(400).json({
                                                message: "Attendance has already been marked for this labour."
                                            });
                                        }

                                        // ===========================
                                        // Save Attendance
                                        // ===========================

                                        Attendance.markAttendance(
                                            attendance,
                                            (err) => {

                                                if (err) {
                                                    return res.status(500).json({
                                                        message: err.message
                                                    });
                                                }

                                                return res.status(201).json({
                                                    message: "Attendance marked successfully."
                                                });

                                            }
                                        );

                                    }
                                );

                            }
                        );

                }
            );

            

        }
    );

};


exports.getAttendance = (req, res) => {

    const jobId = Number(req.params.jobId);
    const farmerId = req.user.id;

    // Validate Job ID
    if (!Number.isInteger(jobId) || jobId <= 0) {
        return res.status(400).json({
            message: "Invalid Job ID."
        });
    }

    // Verify ownership
    Attendance.checkJobOwnership(
        jobId,
        farmerId,
        (err, jobs) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (jobs.length === 0) {
                return res.status(403).json({
                    message: "You are not authorized to view attendance for this job."
                });
            }

            // Fetch attendance
            Attendance.getAttendance(
                jobId,
                (err, attendance) => {

                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    return res.status(200).json(attendance);

                }
            );

        }
    );

};

exports.updateAttendance = (req, res) => {

    const attendanceId = Number(req.params.id);
    const attendance = req.body;
    const farmerId = req.user.id;

    // ===========================
    // Validate Attendance ID
    // ===========================

    if (!Number.isInteger(attendanceId) || attendanceId <= 0) {
        return res.status(400).json({
            message: "Invalid attendance ID."
        });
    }

    // ===========================
    // Required Fields
    // ===========================

    if (
        !attendance.status ||
        !attendance.attendanceDate
    ) {
        return res.status(400).json({
            message: "Attendance status and attendance date are required."
        });
    }

    // ===========================
    // Status Validation
    // ===========================

    const validStatus = [
        "Present",
        "Absent",
        "Half Day"
    ];

    if (!validStatus.includes(attendance.status)) {
        return res.status(400).json({
            message: "Invalid attendance status."
        });
    }

    // ===========================
    // Check In / Check Out Validation
    // ===========================

    if (attendance.checkIn && attendance.checkOut) {

    const checkIn = new Date(`1970-01-01T${attendance.checkIn}`);
    const checkOut = new Date(`1970-01-01T${attendance.checkOut}`);

    if (checkOut <= checkIn) {

        return res.status(400).json({
            message: "Check-out must be later than check-in."
        });

    }

    }

    // ===========================
    // Verify Attendance Ownership
    // ===========================

    Attendance.checkAttendanceOwnership(
        attendanceId,
        farmerId,
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (rows.length === 0) {
                return res.status(403).json({
                    message: "You are not authorized to update this attendance."
                });
            }

            // ===========================
            // Update Attendance
            // ===========================

            Attendance.updateAttendance(
                attendanceId,
                attendance,
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Something went wrong while updating attendance."
                        });
                    }

                    return res.status(200).json({
                        message: "Attendance updated successfully."
                    });

                }
            );

        }
    );

};

exports.deleteAttendance = (req, res) => {

    const attendanceId = Number(req.params.id);

    if (!Number.isInteger(attendanceId) || attendanceId <= 0) {
        return res.status(400).json({
            message: "Invalid attendance ID."
        });
    }

    Attendance.deleteAttendance(
        attendanceId,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Attendance record not found."
                });
            }

            return res.status(200).json({
                message: "Attendance deleted successfully."
            });

        }
    );

};

// exports.bulkAttendance = (req,res)=>{

//     Attendance.bulkAttendance(

//         req.body,

//         (err)=>{

//             if(err){

//                 return res.status(500).json(err);

//             }

//             res.json({

//                 message:"Attendance Saved Successfully"

//             });

//         }

//     );

// };

exports.bulkAttendance = (req, res) => {

    const attendanceList = req.body;

    if (!Array.isArray(attendanceList) || attendanceList.length === 0) {

        return res.status(400).json({
            message: "Attendance list cannot be empty."
        });

    }

    // for (const attendance of attendanceList) {

    //     attendance.farmerId = req.user.id;

    //     const validStatus = [
    //         "Present",
    //         "Absent",
    //         "Half Day"
    //     ];

    //     if (!validStatus.includes(attendance.status)) {

    //         return res.status(400).json({
    //             message: `Invalid status for Labour ID ${attendance.labourId}`
    //         });

    //     }

    // }

    // Attendance.bulkAttendance(
    //     attendanceList,
    //     (err) => {

    //         if (err) {

    //             return res.status(500).json({
    //                 message: err.message
    //             });

    //         }

    //         return res.status(201).json({
    //             message: "Bulk attendance marked successfully."
    //         });

    //     }
    // );

    function validateNext(index) {

    // All attendance records validated
    if (index === attendanceList.length) {

        return Attendance.bulkAttendance(
            attendanceList,
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                return res.status(201).json({
                    message: "Bulk attendance marked successfully."
                });

            }
        );

    }

    // Validate current attendance
    validateAttendance(
        attendanceList[index],
        req.user.id,
        (error) => {

            if (error) {

                return res.status(400).json({
                    message: `Labour ID ${attendanceList[index].labourId}: ${error}`
                });

            }

            // Validate next attendance
            validateNext(index + 1);

        }
    );

}

// Start validation
validateNext(0);

};