const express = require("express");

const router = express.Router();

const AttendanceController = require("../Controllers/AttendanceController");
const {verifyToken }= require("../middlewares/authMiddleware");
const {authorizeRole} = require("../middlewares/authorizeRoles");

router.get("/test", (req, res) => {
    res.send("Attendance Route Working");
});
router.get("/accepted/:jobId", verifyToken, authorizeRole("farmer"), AttendanceController.getAcceptedLabours);

router.post("/", verifyToken, authorizeRole("farmer"), AttendanceController.markAttendance);

router.get("/job/:jobId",verifyToken, authorizeRole("farmer"), AttendanceController.getAttendance);             

router.put("/:id", verifyToken, authorizeRole("farmer"), AttendanceController.updateAttendance);

router.delete("/:id", verifyToken, authorizeRole("admin"), AttendanceController.deleteAttendance);

router.post("/bulk", verifyToken, authorizeRole("farmer"),  AttendanceController.bulkAttendance);

module.exports = router;