const db = require("../config/db");

const Attendance = {};

Attendance.getAcceptedLabours = (jobId, callback) => {

    const sql = `

    SELECT

        u.id,

        u.name,

        u.village,

        u.skills,

        j.wage

    FROM Application a

    JOIN users u

    ON a.labourId = u.id

    JOIN jobs j

    ON a.jobId = j.id

    WHERE

    a.jobId = ?

    AND

    a.status='Accepted'

    `;

    db.query(sql, [jobId], callback);

};

Attendance.markAttendance = (attendance, callback) => {

    const sql = `

    INSERT INTO attendance(

        jobId,

        labourId,

        farmerId,

        attendanceDate,

        status,

        checkIn,

        checkOut,

        remarks

    )

    VALUES(?,?,?,?,?,?,?,?)

    `;

    db.query(

        sql,

        [

            attendance.jobId,

            attendance.labourId,

            attendance.farmerId,

            attendance.attendanceDate,

            attendance.status,

            attendance.checkIn,

            attendance.checkOut,

            attendance.remarks

        ],

        callback

    );

};

Attendance.getAttendance = (jobId, callback) => {

    const sql = `

    SELECT *

    FROM attendance

    WHERE jobId=?

    ORDER BY attendanceDate DESC

    `;

    db.query(sql, [jobId], callback);

};

Attendance.updateAttendance = (

    id,

    attendance,

    callback

) => {

    const sql = `

    UPDATE attendance

    SET

    status=?,

    checkIn=?,

    checkOut=?,

    remarks=?

    WHERE id=?

    `;

    db.query(

        sql,

        [

            attendance.status,

            attendance.checkIn,

            attendance.checkOut,

            attendance.remarks,

            id

        ],

        callback

    );

};

Attendance.deleteAttendance = (attendanceId, callback) => {

    const sql = `
        DELETE FROM attendance
        WHERE id = ?
    `;

    db.query(sql, [attendanceId], callback);

},

Attendance.bulkAttendance = (attendanceList, callback) => {

    const sql = `
        INSERT INTO attendance
        (
            jobId,
            labourId,
            farmerId,
            attendanceDate,
            status,
            checkIn,
            checkOut,
            remarks
        )
        VALUES ?
    `;

    const values = attendanceList.map(attendance => [

        attendance.jobId,
        attendance.labourId,
        attendance.farmerId,
        attendance.attendanceDate,
        attendance.status,
        attendance.checkIn,
        attendance.checkOut,
        attendance.remarks

    ]);

    db.query(
        sql,
        [values],
        callback
    );

},

Attendance.checkAttendance = (

    jobId,

    labourId,

    attendanceDate,

    callback

)=>{

    db.query(

        `

        SELECT *

        FROM attendance

        WHERE

        jobId=?

        AND labourId=?

        AND attendanceDate=?

        `,

        [

            jobId,

            labourId,

            attendanceDate

        ],

        callback

    );

};

Attendance.summary=(jobId,date,callback)=>{

db.query(

`

SELECT

COUNT(*) total,

COALESCE(SUM(status = 'Present'), 0) AS present,
COALESCE(SUM(status = 'Absent'), 0) AS absent,
COALESCE(SUM(status = 'Half Day'), 0) AS halfDay

FROM attendance

WHERE

jobId=?

AND

attendanceDate=?

`,

[jobId,date],

callback

);

}

Attendance.history=(farmerId,callback)=>{

    db.query(

    `

    SELECT

    attendanceDate,

    COUNT(*) total,

    SUM(status='Present') present,

    SUM(status='Absent') absent,

    SUM(status='Half Day') halfDay

    FROM attendance

    WHERE

    farmerId=?

    GROUP BY attendanceDate

    ORDER BY attendanceDate DESC

    `,

    [farmerId], callback

    );
}

Attendance.checkJobOwnership = (jobId, farmerId, callback) => {

    const sql = `
        SELECT id, status
        FROM jobs
        WHERE id = ?
        AND farmerId = ?
    `;

    db.query(sql, [jobId, farmerId], callback);

};

Attendance.checkAcceptedLabour = (jobId, labourId, callback) => {

    const sql = `
        SELECT id
        FROM Application
        WHERE
            jobId = ?
        AND
            labourId = ?
        AND
            status = 'Accepted'
    `;

    db.query(sql, [jobId, labourId], callback);

};

Attendance.checkAttendanceOwnership = (attendanceId, farmerId, callback) => {

    const sql = `
        SELECT a.id
        FROM attendance a
        INNER JOIN jobs j
        ON a.jobId = j.id
        WHERE
            a.id = ?
        AND
            j.farmerId = ?
    `;

    db.query(
        sql,
        [attendanceId, farmerId],
        callback
    );

},

Attendance.checkJobDates = (jobId, callback) => {

    const sql = `
        SELECT
            startDate,
            endDate
        FROM jobs
        WHERE id = ?
    `;

    db.query(sql, [jobId], callback);

};

module.exports = Attendance;