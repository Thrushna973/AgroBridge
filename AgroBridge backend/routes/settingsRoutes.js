const express = require("express");

const router = express.Router();

const SettingsController = require("../controllers/SettingsController");
const settingsValidation = require("../middlewares/settingsValidation");
const settingRateLimiter = require("../middlewares/settingsRateLimiter");
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRole} = require("../middlewares/authorizeRoles");

// =============== Farmer Routes ================

router.get("/profile", verifyToken, authorizeRole("farmer"), SettingsController.getProfile);

router.put("/password", verifyToken, authorizeRole("farmer", "labourer"), settingRateLimiter.changePasswordLimiter, settingsValidation.changePasswordValidation, SettingsController.changeFarmerPassword);

router.put("/profile",verifyToken, authorizeRole("farmer", "labourer"),settingsValidation.updateProfileValidation ,SettingsController.updateProfile);

// Get Preferences
router.get("/preferences", verifyToken, authorizeRole("farmer", "labourer"), SettingsController.getPreferences);

// Update Preferences
router.put("/preferences", verifyToken, authorizeRole("farmer", "labourer"), SettingsController.updatePreferences);

// Get Notification Settings
router.get("/notifications", verifyToken, authorizeRole("farmer", "labourer"), SettingsController.getNotifications);

// Update Notification Settings
router.put("/notifications", verifyToken, authorizeRole("farmer", "labourer"), SettingsController.updateNotifications);

// =========== Admin Routes =============

router.get("/profile/:id", verifyToken, authorizeRole("admin"), SettingsController.getAdminProfile);

router.put("/profile/:id", verifyToken, authorizeRole("admin"), SettingsController.updateAdminProfile);

router.put("/password/:id", verifyToken, authorizeRole("admin"), SettingsController.changePassword);

router.get("/", verifyToken, authorizeRole("admin"), SettingsController.getSettings);

router.put("/", verifyToken, authorizeRole("admin"), SettingsController.updateSettings);


// ============ Labour Routes ==============

router.get("/labourProfile", verifyToken, authorizeRole("labourer"), SettingsController.getMyProfile);


module.exports = router;