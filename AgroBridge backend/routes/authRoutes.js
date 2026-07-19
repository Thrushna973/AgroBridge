const express = require("express");
const router = express.Router();

const AuthController = require("../Controllers/AuthController");
const {upload} = require("../middlewares/uploads");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizeRoles");

router.post("/register",upload.single("photo"), AuthController.register);

router.post("/login", AuthController.login);

router.get("/me", verifyToken, AuthController.getLoggedInUser);

router.get("/users", verifyToken, authorizeRole("admin"), AuthController.getAllUsers);

router.get("/users/:id",verifyToken, authorizeRole("admin", "farmer"), AuthController.getUserById);

router.put("/users/:id/status", verifyToken, authorizeRole("admin"), AuthController.updateUserStatus);

router.delete("/users/:id", verifyToken, authorizeRole("admin"), AuthController.deleteUser);

// router.post("/logout", AuthController.logout);

router.post("/logout", verifyToken, AuthController.logout);

module.exports = router;