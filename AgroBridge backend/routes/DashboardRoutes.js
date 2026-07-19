const express = require("express");

const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRole} = require("../middlewares/authorizeRoles");

const DashboardController = require("../controllers/DashboardController");

router.get("/recent-activity",verifyToken, authorizeRole("farmer", "admin"), DashboardController.getRecentActivity);
router.get("/:jobId/:date", verifyToken, authorizeRole("farmer"), DashboardController.getAttendance);
// router.get("/stats",verifyToken, authorizeRole("farmer"), DashboardController.getFarmerDashboardStats);
router.get("/farmer", verifyToken, authorizeRole("farmer"), DashboardController.getFarmerDashboard);

module.exports = router;