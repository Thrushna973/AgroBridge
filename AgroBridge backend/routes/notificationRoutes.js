const express = require("express");
const router = express.Router();

const NotificationController = require("../Controllers/NotificationController");

router.post("/notifications", NotificationController.createNotification);

router.get("/notifications/:userId", NotificationController.getNotifications);

router.put("/notifications/:id", NotificationController.markAsRead);

router.put("notifications/:userId", NotificationController.markAllAsRead);

router.delete("/notifications/:id", NotificationController.deleteNotification);

module.exports = router;