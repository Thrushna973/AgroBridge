const express = require("express");
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');
const {upload} = require("../middlewares/uploads");

const JobController = require("../Controllers/JobController");
const { authorizeRole } = require("../middlewares/authorizeRoles");

router.post("/", verifyToken, authorizeRole("farmer"), upload.single("photo"), JobController.createJob);

router.get("/labour", verifyToken, authorizeRole("labourer"), JobController.getJobsForLabour);

router.get("/today",verifyToken,authorizeRole("labourer"),JobController.getTodayJobs);

router.get("/",verifyToken, JobController.getAllJobs);

router.get("/my",  verifyToken, authorizeRole("farmer"), JobController.getMyJobs);

router.get("/:id", verifyToken, JobController.getJobById);

router.put("/:id/status",  verifyToken, authorizeRole("farmer", "admin"),JobController.updateJobStatus);

router.delete("/:id",  verifyToken, authorizeRole("farmer", "admin"), JobController.deleteJob);

module.exports = router;
