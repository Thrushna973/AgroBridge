const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizeRoles");

const upload = require("../uploads/farmUpload");

const FarmProfileController = require("../controllers/FarmProfileController");

// =====================================================
// Create Farm Profile
// =====================================================

router.post(
    "/",
    verifyToken,
    authorizeRole("farmer"),
    FarmProfileController.createProfile
);

// =====================================================
// Get Logged-in Farmer Profile
// =====================================================

router.get(
    "/",
    verifyToken,
    authorizeRole("farmer"),
    FarmProfileController.getProfile
);

// =====================================================
// Update Farm Profile
// =====================================================

router.put(
    "/",
    verifyToken,
    authorizeRole("farmer"),
    FarmProfileController.updateProfile
);

// =====================================================
// Upload Farm Photo
// =====================================================

router.put(
    "/photo",
    verifyToken,
    authorizeRole("farmer"),
    upload.single("photo"),
    FarmProfileController.uploadPhoto
);

// =====================================================
// Delete Farm Profile (Optional)
// =====================================================

router.delete(
    "/",
    verifyToken,
    authorizeRole("farmer"),
    FarmProfileController.deleteProfile
);

module.exports = router;