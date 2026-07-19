const Notification = require("../models/Notifications");


// Create Notification
exports.createNotification = (req, res) => {

    const notificationData = req.body;

    Notification.create(
        notificationData,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(201).json({
                message: "Notification Created Successfully"
            });

        }
    );

};


// Get User Notifications
exports.getNotifications = (req, res) => {

    const { userId } = req.params;

    Notification.findByUserId(
        userId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json(result);

        }
    );

};


// Mark One Notification Read
exports.markAsRead = (req, res) => {

    const { id } = req.params;

    Notification.markAsRead(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({
                message: "Notification Marked As Read"
            });

        }
    );

};


// Mark All Notifications Read
exports.markAllAsRead = (req, res) => {

    const { userId } = req.params;

    Notification.markAllAsRead(
        userId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({
                message: "All Notifications Marked As Read"
            });

        }
    );

};


// Delete Notification
exports.deleteNotification = (req, res) => {

    const { id } = req.params;

    Notification.delete(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({
                message: "Notification Deleted Successfully"
            });

        }
    );

};