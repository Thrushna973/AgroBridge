const db = require("../config/db");

const Report = {

    // Submit Report
    create: (reportData, callback) => {

        const sql = `
            INSERT INTO reports (
                reportType,
                jobId,
                reportedUserId,
                reportedBy,
                reason,
                description,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [   
                reportData.reportType,
                reportData.jobid,
                reportData.reportedUserId,
                reportData.reportedBy,
                reportData.reason,
                reportData.description,
                reportData.status || "Pending"
            ],
            callback
        );

    },

    // Get All Reports
    getAllReports: (callback) => {

        db.query(
            "SELECT * FROM reports ORDER BY createdAt DESC",
            callback
        );

    },

    // Get Report By ID
    getReportById: (id, callback) => {

        db.query(
            "SELECT * FROM reports WHERE id = ?",
            [id],
            callback
        );

    },

    // Update Report Status
    updateStatus: (id, status, callback) => {

        db.query(
            "UPDATE reports SET status = ? WHERE id = ?",
            [status, id],
            callback
        );

    },

    // Delete Report
    deleteReport: (id, callback) => {

        db.query(
            "DELETE FROM reports WHERE id = ?",
            [id],
            callback
        );

    },

    checkExistingJobReport: (reportedBy, jobId, callback) => {

        const sql = `
            SELECT *
            FROM reports
            WHERE reportedBy = ?
            AND jobId = ?
            AND status IN ('Pending', 'Under Review')
        `;

        db.query(
            sql,
            [reportedBy, jobId],
            callback
        );

    },

    checkExistingUserReport: (reportedBy,reportedUserId,callback) => {

        const sql = `
            SELECT *
            FROM reports
            WHERE reportedBy = ?
            AND reportedUserId = ?
            AND status IN ('Pending', 'Under Review')
        `;

        db.query(
            sql,
            [
                reportedBy,
                reportedUserId
            ],
            callback
        );

    },

    checkLabourExists: (labourId, callback) => {

        const sql = `
            SELECT id
            FROM users
            WHERE id = ?
            AND role = 'labourer'
        `;

        db.query(sql, [labourId], callback);

    },

    getJobById: (jobId, callback) => {

        const sql = `
            SELECT id, farmerId
            FROM jobs
            WHERE id = ?
        `;

        db.query(sql, [jobId], callback);

    },

    checkWorkedForFarmer: (farmerId, labourId, callback) => {

        const sql = `
            SELECT id
            FROM attendance
            WHERE farmerId = ?
            AND labourId = ?
            LIMIT 1
        `;

        db.query(
            sql,
            [farmerId, labourId],
            callback
        );

    },
    checkJobReportStatus: (reportedBy, jobId, callback) => {

        const sql = `
            SELECT id
            FROM reports
            WHERE reportedBy = ?
            AND jobId = ?
            AND reportType = 'Job'
            AND status IN ('Pending','Under Review')
            LIMIT 1
        `;

        db.query(sql, [reportedBy, jobId], callback);

    }

//     checkExistingReport: (reportedBy, reportedUserId, callback) => {

//     const sql = `
//         SELECT *
//         FROM reports
//         WHERE reportedBy = ?
//         AND reportedUserId = ?
//         AND status IN ('Pending', 'Under Review')
//     `;

//     db.query(sql, [reportedBy, reportedUserId], callback);

// }

};



module.exports = Report;
