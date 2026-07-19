const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRole} = require("../middlewares/authorizeRoles");
const reportLimiter = require("../middlewares/reportRateLimiter");

const ReportController = require("../Controllers/ReportController");
// const uploads = require("../uploads")

router.post("/", verifyToken, reportLimiter, ReportController.submitReport );

router.get("/", verifyToken,authorizeRole("admin"), ReportController.getAllReports);

router.get("/job/:jobId/status", verifyToken, authorizeRole("labourer"), ReportController.checkJobReportStatus);

router.get("/:id", verifyToken, authorizeRole("admin"),ReportController.getReportById);

router.put("/:id/status", verifyToken,authorizeRole("admin"),  ReportController.updateStatus);

router.delete("/:id",verifyToken, authorizeRole("admin"), ReportController.deleteReport);

module.exports = router;