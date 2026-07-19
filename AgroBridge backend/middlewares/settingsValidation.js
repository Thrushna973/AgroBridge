const { body } = require("express-validator");

exports.updateProfileValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("email")
        .isEmail()
        .withMessage("Invalid email."),

    body("phone")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Invalid phone number.")

];

exports.changePasswordValidation = [

    body("currentPassword")
        .notEmpty(),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
        .matches(/[A-Z]/)
        .withMessage("Password needs one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password needs one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password needs one number.")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password needs one special character.")

];