// id
// userId
// message
// isRead

// create()
// findByUserId()
// markAsRead()
// markAllAsRead()
// delete()

const db = require("../config/db");

const Notifications = {
    create: (notificationData, callback) => {
        const sql = `INSERT INTO Notifications (
            id,
            userId,
            message,
            isRead
        ) VALUES (?,?,?,?)`;

        return db.query(
            sql,
            [
                notificationData.id,
                notificationData.userId,
                notificationData.message,
                notificationData.isRead
            ],
            callback
        );
    },

    findByUserId: (userId, callback) =>{
        db.query(
            "SELECT * FROM Application WHERE userId = ?",
            [userId],
            callback
        );
    },

    markAsRead: (id, callback) =>{
        db.query(
            "UPDATE Application SET isRead = TRUE WHERE id = ?",
            [id],
            callback
        );
    },

    markAllAsRead: (userId, callback) =>{
        db.query(
            "UPDATE Application SET isRead = TRUE WHERE userId = ?",
            [userId],
            callback
        );
    }
}

module.exports = Notifications;