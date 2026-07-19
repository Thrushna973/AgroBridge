const Application = require("../models/Applications");

// Apply For Job
exports.applyJob = (req, res) => {

    // const applicationData = req.body;

    // if (
    //     !applicationData.jobId ||
    //     !applicationData.jobTitle ||
    //     !applicationData.labourId
    // ) {

    //     return res.status(400).json({
    //         message: "Job ID, Job Title, and Labour ID are required"
    //     });

    // }

    const applicationData = req.body;

    // Get labour ID from JWT token
    applicationData.labourId = req.user.id;

    if (!applicationData.jobId || !applicationData.jobTitle) {
        return res.status(400).json({
            message: "Job ID and Job Title are required."
        });
    }

    Application.checkExistingApplication(
        applicationData.labourId,
        applicationData.jobId,
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (rows.length > 0) {
                return res.status(400).json({
                    message: "You have already applied for this job."
                });
            }

            // Existing Application.apply() call goes here
            Application.apply(
                applicationData,
                (err, result) => {

                    if (req.user.role !== "labourer") {
                        return res.status(403).json({
                            message: "Only labourers can apply for jobs."
                        });
                    }

                    if (err) {

                        return res.status(500).json({
                            message: err.message
                        });

                    }

                    res.status(201).json({
                        message: "Application Submitted Successfully",
                        applicationId: result.insertId
                    });

                }
            );
        }
    );

    

};


// Get Applications By Job
exports.getApplicationsByJob = (req, res) => {

    const { jobId } = req.params;

    Application.findByJobId(
        jobId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json(result);

        }
    );

};


// Get Labourer Applications
exports.getMyApplications = async (req, res) => {

    try {

        const labourId = req.user.id;

        const applications = await Application.findByLabourId(labourId);

        res.status(200).json(applications);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


// Accept / Reject Application
exports.updateApplicationStatus = (req, res) => {

    // const { id } = req.params;
    const applicationId = Number(req.params.id);

    if (!Number.isInteger(applicationId) || applicationId <= 0) {
        return res.status(400).json({
            message: "Invalid application ID."
        });
    }
    const { status } = req.body;

    const validStatus = [
        "Pending",
        "Accepted",
        "Rejected",
        'Reported',
        "Withdrawn"
    ];

    if (!validStatus.includes(status)) {
        return res.status(400).json({
            message: "Invalid status."
        });
    }

    // Logged-in farmer
    const farmerId = req.user.id;

    // Verify ownership
    Application.checkApplicationOwnership(
        applicationId,
        farmerId,
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            // Application doesn't belong to this farmer
            if (rows.length === 0) {
                return res.status(403).json({
                    message: "You are not authorized to update this application."
                });
            }

            // Owner verified → update status
            Application.updateStatus(
                applicationId,
                status,
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    return res.status(200).json({
                        message: `Application ${status.toLowerCase()} successfully.`
                    });

                }
            );

        }
    );

};


// Delete Application
exports.deleteApplication = (req, res) => {

    const { id } = req.params;

    Application.delete(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({
                message: "Application Deleted Successfully"
            });

        }
    );

};

exports.getFarmerApplications = (req, res) => {

    const  farmerId  = req.user.id;

    Application.findByFarmerId(

        farmerId,

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.status(200).json(result);

        }

    );

};