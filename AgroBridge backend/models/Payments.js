// id
// bookingId
// amount
// status


// create()
// findById()
// findByFarmerId()
// findByLabourerId()
// findByJobId()
// updateStatus()

const db = require("../config/db.js")

const payments = {
    create: (paymentsData, callback) => {
       const sql = `INSERT INTO payments (
            id,
            farmerId,
            labourId,
            bookingId,
            amount,
            status
       ) VALUES (?,?,?,?,?,?)`;

       return db.query(
        sql,
        [
            paymentsData.id,
            paymentsData.farmerId,
            paymentsData.labourId,
            paymentsData.bookingId,
            paymentsData.amount,
            paymentsData.status
        ],
        callback
       );
    },

    findById: (id, callback) =>{
        db.query(
            "SELECT * FROM payments WHERE id = ?",
            [id],
            callback
        );
    },

    findByFarmerId: (farmerId, callback) =>{
        db.query(
            "SELECT * FROM payments WHERE farmerId = ?",
            [farmerId],
            callback
        );
    },

    findByLabourId: (labourId, callback) =>{
        db.query(
            "SELECT * FROM payments WHERE labourId = ?",
            [labourId],
            callback
        );
    },

    updateStatus: (id, status, callback) =>{
        db.query(
            "UPDATE payments SET status = ? WHERE id = ?",
            [status, id],
            callback
        );
    }

}