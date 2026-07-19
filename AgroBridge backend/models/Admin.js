const db = require("../config/db");

const Admin = {

    getDashboardStats: (callback) => {

        const sql = `

        SELECT

        /* Farmers */

        (SELECT COUNT(*)
         FROM users
         WHERE role='farmer')
         AS totalFarmers,

        (SELECT COUNT(*)
         FROM users
         WHERE role='farmer'
         AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY))
         AS farmersThisWeek,



        /* Labourers */

        (SELECT COUNT(*)
         FROM users
         WHERE role='labourer')
         AS totalLabourers,

        (SELECT COUNT(*)
         FROM users
         WHERE role='labourer'
         AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY))
         AS labourersThisWeek,



        /* Active Jobs */

        (SELECT COUNT(*)
         FROM jobs
         WHERE status='open')
         AS activeJobs,

        (SELECT COUNT(*)
         FROM jobs
         WHERE status='open'
         AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY))
         AS activeJobsThisWeek,



        /* Completed Jobs */

        (SELECT COUNT(*)
         FROM jobs
         WHERE status='completed')
         AS completedJobs,

        (SELECT COUNT(*)
         FROM jobs
         WHERE status='completed'
         AND completedAt >= DATE_SUB(NOW(), INTERVAL 7 DAY))
         AS completedJobsThisWeek;

        `;

        db.query(sql, callback);

    }

};

module.exports = Admin;