const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRole} = require("../middlewares/authorizeRoles");

const ApplicationController = require("../Controllers/ApplicationController");


// Apply for a job
router.post("/", verifyToken, authorizeRole("labourer"),ApplicationController.applyJob);

// Get applications for a farmer
router.get("/farmer", verifyToken, authorizeRole("farmer"), ApplicationController.getFarmerApplications);

// Get applications for a job
router.get("/job/:jobId",verifyToken, authorizeRole("farmer"), ApplicationController.getApplicationsByJob);

// Get applications of a labourer
router.get("/my", verifyToken, authorizeRole("labourer"), ApplicationController.getMyApplications);

// Update application status
router.put("/:id/status", verifyToken, authorizeRole("farmer"), ApplicationController.updateApplicationStatus);

// Delete application
router.delete("/:id", verifyToken, authorizeRole("labourer"), ApplicationController.deleteApplication);

module.exports = router;