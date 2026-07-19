const db = require("../config/db");
const Attendance = require("./Attendence");

const Dashboard = {};

Dashboard.getLatestFarmers = () => {

    return new Promise((resolve, reject) => {

        db.query(

            `SELECT
                id,
                name,
                village,
                createdAt
            FROM users
            WHERE role='farmer'
            ORDER BY createdAt DESC
            LIMIT 5`,

            (err, result) => {

                if (err) reject(err);

                else resolve(result);

            }

        );

    });

};

Dashboard.getLatestLabours = () => {

    return new Promise((resolve, reject) => {

        db.query(

            `SELECT
                id,
                name,
                village,
                createdAt
            FROM users
            WHERE role='labourer'
            ORDER BY createdAt DESC
            LIMIT 5`,

            (err, result) => {

                if (err) reject(err);

                else resolve(result);

            }

        );

    });

};

Dashboard.getLatestJobs = () => {

    return new Promise((resolve, reject) => {

        db.query(

            `SELECT
                id,
                title,
                village,
                createdAt
            FROM jobs
            ORDER BY createdAt DESC
            LIMIT 5`,

            (err, result) => {

                if (err) reject(err);

                else resolve(result);

            }

        );

    });

};

// Dashboard.getLatestPayments = () => {

//     return new Promise((resolve, reject) => {

//         db.query(

//             `SELECT
//                 id,
//                 amount,
//                 createdAt
//             FROM payments
//             ORDER BY createdAt DESC
//             LIMIT 5`,

//             (err, result) => {

//                 if (err) reject(err);

//                 else resolve(result);

//             }

//         );

//     });

// };



//Farmer Attendance page models

Dashboard.getSummary = (jobId, date) => {

    return new Promise((resolve, reject) => {

        Attendance.summary(

            jobId,

            date,

            (err, result) => {

                if (err)

                    reject(err);

                else

                    resolve(result);

            }

        );

    });

};

Dashboard.getLabours = (jobId) => {

    return new Promise((resolve, reject) => {

        Attendance.getAcceptedLabours(

            jobId,

            (err, result) => {

                if (err)

                    reject(err);

                else

                    resolve(result);

            }

        );

    });

};

Dashboard.getHistory = (farmerId) => {

    return new Promise((resolve, reject) => {

        Attendance.history(

            farmerId,

            (err, result) => {

                if (err)

                    reject(err);

                else

                    resolve(result);

            }

        );

    });

};

// Dashboard.getTodayWages = (jobId, date, callback) => {
    
//     const sql = `
//         SELECT
//             a.status,
//             j.wage
//         FROM attendance a
//         JOIN jobs j
//             ON a.jobId = j.id
//         WHERE
//             a.jobId = ?
//         AND
//             a.attendanceDate = ?
//     `;

//     db.query(sql, [jobId, date], callback);

// };

Dashboard.getTodayWages = (jobId, date) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                a.status,
                j.wage
            FROM attendance a
            JOIN jobs j
                ON a.jobId = j.id
            WHERE
                a.jobId = ?
            AND
                a.attendanceDate = ?
        `;

        db.query(sql, [jobId, date], (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

};

// Dashboard.getActiveJobs = (farmerId, callback) => {

//     const sql = `
//         SELECT COUNT(*) AS activeJobs
//         FROM jobs
//         WHERE farmerId = ?
//         AND status = 'Open'
//     `;

//     db.query(sql,[farmerId],callback);

// };
Dashboard.getActiveJobs = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                COUNT(*) AS activeJobs

            FROM jobs

            WHERE

                farmerId = ?

            AND

                status = 'Open'

        `;

        db.query(sql, [farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};

// Dashboard.getTotalLabourers = (farmerId, callback) => {

//     const sql = `

//         SELECT

//             COUNT(DISTINCT a.labourId) AS totalLabourers

//         FROM application a

//         JOIN jobs j

//         ON a.jobId = j.id

//         WHERE

//             j.farmerId = ?

//         AND

//             a.status = 'Accepted'

//     `;

//     db.query(sql, [farmerId], callback);

// };
Dashboard.getTotalLabourers = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                COUNT(DISTINCT a.labourId) AS totalLabourers

            FROM application a

            JOIN jobs j

            ON a.jobId = j.id

            WHERE

                j.farmerId = ?

            AND

                a.status = 'Accepted'

        `;

        db.query(sql, [farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};

// Dashboard.getPendingApplications = (farmerId, callback) => {

//     const sql = `

//         SELECT

//             COUNT(*) AS pendingApplications

//         FROM application a

//         JOIN jobs j

//         ON a.jobId = j.id

//         WHERE

//             j.farmerId = ?

//         AND

//             a.status = 'Pending'

//     `;

//     db.query(sql, [farmerId], callback);

// };
Dashboard.getPendingApplications = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                COUNT(*) AS pendingApplications

            FROM application a

            JOIN jobs j

            ON a.jobId = j.id

            WHERE

                j.farmerId = ?

            AND

                a.status = 'Pending'

        `;

        db.query(sql, [farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};

// Dashboard.getCompletedJobs = (farmerId, callback) => {

//     const sql = `

//         SELECT

//             COUNT(*) AS completedJobs

//         FROM jobs

//         WHERE

//             farmerId = ?

//         AND

//             endDate < CURDATE()

//     `;

//     db.query(sql, [farmerId], callback);

// };

Dashboard.getCompletedJobs = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                COUNT(*) AS completedJobs

            FROM jobs

            WHERE

                farmerId = ?

            AND

                endDate < CURDATE()

        `;

        db.query(sql, [farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};

Dashboard.getTodayWorkers = (farmerId) => {

    return new Promise((resolve,reject)=>{

        const sql = `SELECT

    u.id,
    u.name,
    u.photo,
    j.title,
    a.checkIn,
    a.checkOut,
    a.status

FROM attendance a

JOIN users u
ON a.labourId = u.id

JOIN jobs j
ON a.jobId = j.id

WHERE

    j.farmerId = ?

AND

    a.attendanceDate = CURDATE()

AND

    a.status IN ('Present','Half Day')

ORDER BY u.name;`;

        db.query(sql,[farmerId],(err,result)=>{

            if(err){

                reject(err);

            }

            else{

                resolve(result);

            }

        });

    });

};

Dashboard.getPendingApplicationsList=(farmerId)=>{

    return new Promise((resolve,reject)=>{

        const sql=`SELECT

    a.id,

    u.id AS labourId,

    u.name,

    u.photo,

    u.skills,

    j.title,

    a.appliedAt

FROM application a

JOIN users u

ON a.labourId=u.id

JOIN jobs j

ON a.jobId=j.id

WHERE

    j.farmerId=?

AND

    a.status='Pending'

ORDER BY a.appliedAt DESC

LIMIT 5;`;

        db.query(sql,[farmerId],(err,result)=>{

            if(err){

                reject(err);

            }

            else{

                resolve(result);

            }

        });

    });

};

Dashboard.getMyJobs = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                j.id,
                j.title,
                j.photo,
                j.wage,
                j.requiredWorkers,
                j.startDate,
                j.endDate,

                COUNT(a.id) AS appliedCount

            FROM jobs j

            LEFT JOIN application a

            ON j.id = a.jobId

            WHERE

                j.farmerId = ?

            GROUP BY

                j.id,
                j.title,
                j.photo,
                j.wage,
                j.requiredWorkers,
                j.startDate,
                j.endDate

            ORDER BY

                j.createdAt DESC

            LIMIT 5

        `;

        db.query(sql, [farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};

Dashboard.getNearbyLabours = (farmerId) => {

    return new Promise((resolve, reject) => {

        const sql = `

            SELECT

                l.id,
                l.name,
                l.photo,
                l.skills,
                l.village

            FROM users l

            JOIN users f

            ON f.id = ?

            WHERE

                l.role = 'labourer'

            AND

                l.village = f.village

            AND

                l.id != ?

            LIMIT 5

        `;

        db.query(sql, [farmerId, farmerId], (err, result) => {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

};


module.exports = Dashboard;