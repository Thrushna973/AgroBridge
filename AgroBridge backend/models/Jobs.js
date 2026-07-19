// id
// farmerId
// title
// description
// wage
// location
// date
// time
// requiredLabourers
// status


const db = require("../config/db");

const Jobs = {

    create: (jobData, callback) => {

    const sql = `
        INSERT INTO jobs (
            farmerId,
            title,
            farmtype,
            worktype,
            village,
            wage,
            requiredworkers,
            startdate,
            enddate,
            workinghours,
            experience,
            distance,
            food,
            accommodation,
            description,
            skills,
            photo,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        jobData.farmerId,
        jobData.title,
        jobData.farmtype,
        jobData.worktype,
        jobData.village,
        jobData.wage,
        jobData.requiredworkers,
        jobData.startdate,
        jobData.enddate,
        jobData.workinghours,
        jobData.experience,
        jobData.distance,
        jobData.food,
        jobData.accommodation,
        jobData.description,
        jobData.skills,
        jobData.photo,
        jobData.status || "open"
    ];

    console.log("========== VALUES ==========");
    console.log(values);
    console.log("VALUES LENGTH:", values.length);

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("========== MYSQL ERROR ==========");
            console.log("CODE:", err.code);
            console.log("ERRNO:", err.errno);
            console.log("MESSAGE:", err.sqlMessage);
            console.log("SQL:", err.sql);

            return callback(err);
        }

        callback(null, result);

    });

},

    findById: (id, callback) => {

        db.query(
            "SELECT * FROM jobs WHERE id = ?",
            [id],
            callback
        );
    },

    findAll: (callback) => {

        db.query(
            "SELECT * FROM jobs",
            callback
        );
    },

    findByFarmerId: (farmerId, callback) => {

        db.query(
            "SELECT * FROM jobs WHERE farmerId = ?",
            [farmerId],
            callback
        );
    },

    updateStatus: (id, status, callback) => {

        db.query(
            "UPDATE jobs SET status = ? WHERE id = ?",
            [status, id],
            callback
        );
    },

    findDuplicateJob: (jobData, callback) => {

        const sql = `
            SELECT id
            FROM jobs
            WHERE farmerId = ?
            AND title = ?
            AND farmtype = ?
            AND worktype = ?
            AND village = ?
            AND startdate = ?
            AND enddate = ?
        `;

        db.query(
            sql,
            [
                jobData.farmerId,
                jobData.title,
                jobData.farmtype,
                jobData.worktype,
                jobData.village,
                jobData.startdate,
                jobData.enddate
            ],
            callback
        );

    },

    findJobsForLabour: (labourId, callback) => {

        const sql = 
            `SELECT

                j.id,

                j.title,

                j.photo,

                j.village,

                j.wage,

                j.worktype,

                j.farmtype,

                j.startdate,

                j.enddate,

                j.workinghours,

                j.distance,

                j.requiredworkers,

                CASE

                    WHEN a.id IS NULL THEN FALSE

                    ELSE TRUE

                END AS applied,

                CASE

                    WHEN CURDATE() < j.startdate THEN 'Upcoming'

                    WHEN CURDATE() BETWEEN j.startdate AND j.enddate THEN 'Ongoing'

                    WHEN CURDATE() > j.enddate THEN 'Completed'

                    ELSE 'Open'

                END AS jobStatus

            FROM jobs j

            LEFT JOIN application a

            ON j.id = a.jobId

            AND a.labourId = ?

            WHERE

                j.status = 'open'

            ORDER BY

                j.createdAt DESC;
        `;

        db.query(sql, [labourId], callback);

    },
    getTodayJobs : (callback) => {

    const sql = `

        SELECT

            j.id,
            j.title,
            j.wage,
            j.village,
            j.photo,
            j.createdAt,
            j.distance,
            j.startdate,
            j.enddate,
            j.requiredworkers,
            j.farmtype,
            j.worktype,

            u.name AS farmerName

        FROM jobs j

        JOIN users u
        ON j.farmerId = u.id

        WHERE DATE(j.createdAt)=CURDATE()

        AND j.status='open'

        ORDER BY j.createdAt DESC

    `;

    db.query(sql, callback);

},
    updateExpiredJobs: (callback) => {

    const sql = `
        UPDATE jobs
        SET status = 'completed'
        WHERE enddate < CURDATE()
        AND status = 'open'
    `;

    db.query(sql, callback);

    },

    delete: (id, callback) => {

        db.query(
            "DELETE FROM jobs WHERE id = ?",
            [id],
            callback
        );
    }

};

module.exports = Jobs;