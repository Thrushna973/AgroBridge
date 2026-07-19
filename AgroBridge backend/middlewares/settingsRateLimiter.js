const rateLimit = require("express-rate-limit");

exports.changePasswordLimiter = rateLimit({

    windowMs: 10 * 60 * 1000,

    max: 5,

    message: {

        message:
        "Too many password attempts. Try again after 10 minutes."

    }

});