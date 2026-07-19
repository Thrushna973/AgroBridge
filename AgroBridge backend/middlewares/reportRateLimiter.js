const rateLimit = require("express-rate-limit");

const reportLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,   // 10 minutes
    max: 5,

    message: {
        message: "Too many reports submitted. Please try again after 10 minutes."
    },

    standardHeaders: true,
    legacyHeaders: false
});

module.exports = reportLimiter;