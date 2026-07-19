const express = require("express");
const router = express.Router();

const {chatWithAI, speechToText} = require("../Controllers/AIController");
const {verifyToken} = require("../middlewares/authMiddleware");
const {audioUpload} = require("../middlewares/uploads")


router.post("/chat", verifyToken, chatWithAI);
// routes/AIRoutes.js
router.post("/speech-to-text", audioUpload.single("audio"),speechToText);

module.exports = router;