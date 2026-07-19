const Job = require("../models/Jobs");
const JobService = require("../services/JobService");

// Create Job
// exports.createJob = (req,res)=>{
//     const jobData = req.body;

//     jobData.farmerId = req.user.id;
//         console.log(req.body);
//         console.log(req.file);

//         if (req.file) {
//             jobData.photo = req.file.filename;
//         }

//     Job.findDuplicateJob(jobData, (err, duplicate) => {

//         if (   
//             !jobData.farmerId ||
//             !jobData.title ||
//             !jobData.description ||
//             !jobData.wage === undefined ||
//             !jobData.requiredworkers === undefined || 
//             !jobData.startdate || 
//             !jobData.enddate ||
//             !jobData.workinghours ||
//             !jobData.food === undefined ||
//             !jobData.experience || 
//             !jobData.village ||
//             !jobData.worktype || 
//             !jobData.distance === undefined ||
//             !jobData.accommodation === undefined 
//         ) {

//             return res.status(400).json({
//                 message: "Please fill all required fields"
//             });

//         }

//         if (err) {

//             return res.status(500).json({
//                 message: err.message
//             });

//         }

//         if (duplicate.length > 0) {

//             return res.status(409).json({
//                 message: "You have already posted this job."
//             });

//         }

//     // No duplicate, create the job
//     Job.create(jobData, (err, result) => {

//         // if (err) {

//         //     if (err.code === "ER_DUP_ENTRY") {
//         //         return res.status(409).json({
//         //             message: "You have already posted this job."
//         //         });
//         //     }

//         //     return res.status(500).json({
//         //         message: err.message
//         //     });

//         // }

//         res.status(201).json({

//             message: "Job Posted Successfully",
//             jobId: result.insertId

//         });

//     });

//     });

// };


exports.createJob = async (req, res) => {

    try {

        const jobData = req.body;

        jobData.farmerId = req.user.id;

        if (req.file) {

            jobData.photo = req.file.filename;

        }

        const result = await JobService.createJob(jobData);

        res.status(201).json({

            message: "Job Posted Successfully",

            jobId: result.jobId

        });

    }

    catch (error) {

        res.status(error.status || 500).json({

            message: error.message

        });

    }

};


// Get All Jobs
exports.getAllJobs = (req, res) => {

    Job.updateExpiredJobs((err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        if(res.length===0){

            return res.status(404).json({

                message:"Job not found."

            });

        }
    

        Job.findAll((err, jobs) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json(jobs);

        });

    });

};


// Get Job By ID
exports.getJobById = (req, res) => {

    const { id } = req.params;

    Job.findById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        res.status(200).json(result[0]);

    });

};


//  Get Farmer Jobs
// Get Logged-in Farmer Jobs
exports.getMyJobs = (req, res) => {

    const farmerId = req.user.id;

    Job.findByFarmerId(farmerId, (err, jobs) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }
        if (jobs.farmerId === req.user.id) {

            return res.status(400).json({
                message: "You cannot report your own job."
            });

        }

        res.status(200).json(jobs);

    });

};

exports.getJobsForLabour = (req, res) => {

    const labourId = req.user.id;

    Job.findJobsForLabour(

        labourId,

        (err, jobs) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            res.status(200).json(jobs);

        }

    );

};

exports.updateJobStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const validStatus = [

        "open",
        "completed",
        "cancelled"

    ];

    if (!validStatus.includes(status)) {

        return res.status(400).json({

            message: "Invalid status."

        });

    }

    Job.findById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Job not found."
            });

        }

        const job = result[0];

        if (

            req.user.role !== "admin" &&

            job.farmerId !== req.user.id

        ) {

            return res.status(403).json({

                message: "You are not authorized."

            });

        }

        Job.updateStatus(id, status, (err) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({

                message: "Job status updated successfully."

            });

        });

    });

};

// Delete Job
exports.deleteJob = (req, res) => {

    const { id } = req.params;

    Job.findById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Job not found."
            });

        }

        const job = result[0];

        if (

            req.user.role !== "admin" &&

            job.farmerId !== req.user.id

        ) {

            return res.status(403).json({

                message: "You are not authorized."

            });

        }

        Job.delete(id, (err) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({

                message: "Job deleted successfully."

            });

        });

    });

};

exports.getTodayJobs = (req,res)=>{

    Job.getTodayJobs((err,jobs)=>{

        if(err){

            return res.status(500).json({
                message:err.message
            });

        }

        res.status(200).json(jobs);

    });

};