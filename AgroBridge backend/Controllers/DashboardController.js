const Dashboard = require("../models/Dashboard");
const Attendance = require("../models/Attendence");

exports.getRecentActivity = async (req, res) => {

    try {

        const [

            farmers,

            labours,

            jobs,

            // payments

        ] = await Promise.all([

            Dashboard.getLatestFarmers(),

            Dashboard.getLatestLabours(),

            Dashboard.getLatestJobs(),

            // Dashboard.getLatestPayments()

        ]);

        let activities = [];

        farmers.forEach(farmer => {

            activities.push({

                id: farmer.id,

                type: "Farmer",

                title: "New Farmer Registered",

                description: `${farmer.name} from ${farmer.village}`,

                createdAt: farmer.createdAt

            });

        });

        labours.forEach(labour => {

            activities.push({

                id: labour.id,

                type: "Labour",

                title: "New Labour Registered",

                description: `${labour.name} from ${labour.village}`,

                createdAt: labour.createdAt

            });

        });

        jobs.forEach(job => {

            activities.push({

                id: job.id,

                type: "Job",

                title: "Job Posted",

                description: `${job.title} (${job.village})`,

                createdAt: job.createdAt

            });

        });

        // payments.forEach(payment => {

        //     activities.push({

        //         id: payment.id,

        //         type: "Payment",

        //         title: "Payment Completed",

        //         description: `₹${payment.amount} payment completed`,

        //         createdAt: payment.createdAt

        //     });

        // });

        activities.sort(

            (a, b) =>

                new Date(b.createdAt) -

                new Date(a.createdAt)

        );

        res.json(

            activities

        );

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

exports.getAttendance = (req, res) => {

    const { jobId, date } = req.params;
    const farmerId = req.user.id;

    Attendance.checkJobOwnership(
        jobId,
        farmerId,
        async (err, jobs) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (jobs.length === 0) {
                return res.status(403).json({
                    message: "You are not authorized to access this job."
                });
            }

            try {

                const [

                    summary,

                    labourers,

                    history,

                    wages

                ] = await Promise.all([

                    Dashboard.getSummary(jobId, date),

                    Dashboard.getLabours(jobId),

                    Dashboard.getHistory(farmerId),

                    Dashboard.getTodayWages(jobId, date)

                ]);

                let totalWages = 0;

                wages.forEach(item => {

                    if (item.status === "Present") {

                        totalWages += Number(item.wage);

                    }

                    else if (item.status === "Half Day") {

                        totalWages += Number(item.wage) / 2;

                    }

                });

                return res.json({

                    summary: summary[0],

                    labourers,

                    history,

                    todayWages: totalWages

                });

            }

            catch (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

        }

    );

};

exports.getFarmerDashboard = async (req, res) => {

    try {

        const farmerId = req.user.id;

        const [

            activeJobs,

            totalLabourers,

            pendingApplications,

            completedJobs,

            todayWorkers,

            pendingApplicationsList,

            myJobs,

            nearbyLabours

            // recentActivity

        ] = await Promise.all([

            Dashboard.getActiveJobs(farmerId),

            Dashboard.getTotalLabourers(farmerId),

            Dashboard.getPendingApplications(farmerId),

            Dashboard.getCompletedJobs(farmerId),

            Dashboard.getTodayWorkers(farmerId),

            Dashboard.getPendingApplicationsList(farmerId),

            Dashboard.getMyJobs(farmerId),

            Dashboard.getNearbyLabours(farmerId)

            // Dashboard.getRecentActivity(farmerId)

        ]);

        res.status(200).json({

            stats: {

                activeJobs: activeJobs[0].activeJobs,

                totalLabourers: totalLabourers[0].totalLabourers,

                pendingApplications: pendingApplications[0].pendingApplications,

                completedJobs: completedJobs[0].completedJobs

            },

            todayWorkers,

            pendingApplicationsList,

            myJobs,

            nearbyLabours

            // recentActivity

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// exports.getFarmerDashboardStats = async(req,res)=>{

//     try{

//         const farmerId=req.user.id;

//         const [

//             active,

//             hired,

//             pending,

//             completed

//         ] = await Promise.all([

//             Dashboard.getActiveJobs(farmerId),

//             Dashboard.getTotalLabourers(farmerId),

//             Dashboard.getPendingApplications(farmerId),

//             Dashboard.getCompletedJobs(farmerId)

//         ]);

//         res.json({

//             activeJobs:active[0].activeJobs,

//             totalHired:hired[0].totalLabourers,

//             pendingApplications:pending[0].pendingApplications,

//             completedJobs:completed[0].completedJobs

//         });

//     }

//     catch(err){

//         res.status(500).json({

//             message:err.message

//         });

//     }

// };