// id
// jobId
// labourId
// status

// apply()
// findById()
// findByJobId()
// findByLabourerId()
// updateStatus()
// delete()

const db = require("../config/db.js");

const Application = {             
    apply: (applicationData, callback) => {
        const sql = `INSERT INTO Application (
            jobId,
            jobTitle,
            labourId
        ) VALUES(?,?,?)`;

        return db.query(
            sql,
            [
                applicationData.jobId,
                applicationData.jobTitle,
                applicationData.labourId,
                // applicationData.status
            ],
            callback
        );
    },

    findById: (id, callback) =>{
        db.query(
            "SELECT * FROM Application WHERE id = ?",
            [id],
            callback
        );
    },

    findByFarmerId: (farmerId, callback) => {

        const sql = `
            SELECT a.*
            FROM Application a
            JOIN jobs j
            ON a.jobId = j.id
            WHERE j.farmerId = ?
        `;

        db.query(
            sql,
            [farmerId],
            callback
        );

    },

    findByJobId: (jobId, callback) => {
        db.query(
            "SELECT * FROM Application WHERE jobId = ?",
            [jobId],
            callback
        );
    },

    // findByLabourId: (labourId, callback) =>{
    //     db.query(
    //         "SELECT * FROM Application WHERE labourId = ?",
    //         [labourId],
    //         callback
    //     );
    // },
    
    checkExistingApplication: (labourId, jobId, callback) => {

        db.query(
            `SELECT id
            FROM Application
            WHERE labourId = ?
            AND jobId = ?`,
            [labourId, jobId],
            callback
        );

    },

    checkApplicationOwnership: (applicationId, farmerId, callback) => {

        const sql = `
            SELECT a.id
            FROM Application a
            INNER JOIN jobs j
            ON a.jobId = j.id
            WHERE
                a.id = ?
            AND
                j.farmerId = ?
        `;

        db.query(
            sql,
            [applicationId, farmerId],
            callback
        );

    },

    updateStatus: (id, status, callback) =>{
        db.query(
            "UPDATE Application SET status = ? WHERE id = ?",
            [status, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query(
            "DELETE FROM Application WHERE id = ?",
            [id],
            callback
        );
    }
}

Application.findByLabourId = (labourId) => {

        return new Promise((resolve, reject) => {

            const sql = `

                SELECT

                    a.id AS applicationId,

                    j.id AS jobId,

                    j.title AS jobTitle,

                    u.name AS farmerName,

                    fp.farmName,

                    j.village,

                    j.wage,

                    j.startDate,

                    j.endDate,

                    j.workingHours,

                    a.appliedAt AS applicationDate,

                    a.status AS applicationStatus,

                    CASE
                        WHEN CURDATE() < j.startDate THEN 'Upcoming'
                        WHEN CURDATE() BETWEEN j.startDate AND j.endDate THEN 'Ongoing'
                        WHEN CURDATE() > j.endDate THEN 'Completed'
                        ELSE j.status
                    END AS jobStatus

                FROM application a

                JOIN jobs j

                ON a.jobId = j.id

                JOIN users u

                ON j.farmerId = u.id

                LEFT JOIN farm_profiles fp

                ON fp.farmerId = u.id

                WHERE

                    a.labourId = ?

                ORDER BY

                    a.appliedAt DESC

            `;

            db.query(sql, [labourId], (err, result) => {

                if (err) {

                    reject(err);

                }

                else {

                    resolve(result);

                }

            });

        });

    };

module.exports = Application;