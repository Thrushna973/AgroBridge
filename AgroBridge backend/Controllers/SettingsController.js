const bcrypt = require("bcryptjs");
const Settings = require("../models/Settings");
const { validationResult } = require("express-validator");


// ===========================
// Get Admin Profile
// ===========================

exports.getAdminProfile = (req, res) => {

    const id = req.params.id;

    Settings.getAdminProfile(id, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(404).json({

                message: "Admin not found."

            });

        }

        res.json(result[0]);

    });

};


// ===========================
// Update Admin Profile
// ===========================

exports.updateAdminProfile = (req, res) => {

    const id = req.params.id;

    Settings.updateAdminProfile(

        id,

        req.body,

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                message: "Profile updated successfully."

            });

        }

    );

};


// ===========================
// Change Password
// ===========================

exports.changePassword = (req, res) => {

    const id = req.params.id;

    const {

        currentPassword,

        newPassword,

        confirmPassword

    } = req.body;
    console.log(req.body);

    // Empty Validation

    if (

        !currentPassword ||

        !newPassword ||

        !confirmPassword

    ) {

        return res.status(400).json({

            message: "Please fill all fields."

        });

    }


    // Confirm Password Validation

    if (newPassword !== confirmPassword) {

        return res.status(400).json({

            message: "Passwords do not match."

        });

    }


    // Password Length

    if (newPassword.length < 8) {

        return res.status(400).json({

            message: "Password must contain at least 8 characters."

        });

    }


    // Same Password Validation

    if (currentPassword === newPassword) {

        return res.status(400).json({

            message: "New password must be different from current password."

        });

    }


    Settings.getPassword(id, async (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(404).json({

                message: "Admin not found."

            });

        }

        const storedPassword = result[0].password;
        console.log("Entered Password:", currentPassword);
        console.log("Stored Hash:", storedPassword);

        const test = await bcrypt.compare(
    "admin123",
    "$2b$10$Mh7JM5KCtOoru7rqU6zj2ugM/MeA9KLgwuARA8zaDl9F5W7vToQ7u"
);

console.log("Test Result:", test);
        const isMatch = await bcrypt.compare(

            currentPassword,

            storedPassword

        );


        if (!isMatch) {

            return res.status(400).json({

                message: "Current password is incorrect."

            });

        }


        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );


        Settings.changePassword(

            id,

            hashedPassword,

            (err) => {

                if (err) {

                    return res.status(500).json(err);

                }

                res.json({

                    message: "Password changed successfully."

                });

            }

        );

    });

};


// ===========================
// Get Platform Settings
// ===========================

exports.getSettings = (req, res) => {

    Settings.getSettings((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result[0]);

    });

};


// ===========================
// Update Platform Settings
// ===========================

exports.updateSettings = (req, res) => {

    Settings.updateSettings(

        req.body,

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                message: "Settings updated successfully."

            });

        }

    );

};


// const bcrypt = require("bcrypt");
// const Settings = require("../models/Settings");

// =====================================================
// Get Logged-in User Profile
// =====================================================

exports.getProfile = (req, res) => {

    const userId = req.user.id;

    Settings.getProfile(

        userId,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    message: "User not found."

                });

            }

            return res.status(200).json(

                result[0]

            );

        }

    );

};

// =====================================================
// Update Profile
// =====================================================

    exports.updateProfile = (req, res) => {

    const userId = req.user.id;

    const {

        name,

        phone,

        email

    } = req.body;

    if (

        !name ||

        !phone ||

        !email

    ) {

        return res.status(400).json({

            message: "Please fill all required fields."

        });

    }

    // ==========================
    // Check Duplicate Email
    // ==========================

    Settings.checkEmailExists(

        email,

        userId,

        (err, emailRows) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (emailRows.length > 0) {

                return res.status(400).json({

                    message: "Email already exists."

                });

            }

            // ==========================
            // Check Duplicate Phone
            // ==========================

            Settings.checkPhoneExists(

                phone,

                userId,

                (err, phoneRows) => {

                    if (err) {

                        return res.status(500).json({

                            message: err.message

                        });

                    }

                    if (phoneRows.length > 0) {

                        return res.status(400).json({

                            message: "Phone number already exists."

                        });

                    }

                    // ==========================
                    // Update Profile
                    // ==========================

                    const profile = {

                        name,

                        phone,

                        email

                    };

                    Settings.updateProfile(

                        userId,

                        profile,

                        (err) => {

                            if (err) {

                                return res.status(500).json({

                                    message: err.message

                                });

                            }

                            return res.status(200).json({

                                message: "Profile updated successfully."

                            });

                        }

                    );

                }

            );

        }

    );

};


// =====================================================
// Change Password
// =====================================================

exports.changeFarmerPassword = (req, res) => {

    const userId = req.user.id;

    const {

        currentPassword,

        newPassword

    } = req.body;

    if (

        !currentPassword ||

        !newPassword

    ) {

        return res.status(400).json({

            message: "Current and New Password are required."

        });

    }

    Settings.getPassword(

        userId,

        async (

            err,

            result

        ) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    message: "User not found."

                });

            }

            const isMatch = await bcrypt.compare(

                currentPassword,

                result[0].password

            );

            if (!isMatch) {

                return res.status(400).json({

                    message: "Current password is incorrect."

                });

            }

            if (currentPassword === newPassword) {

                return res.status(400).json({

                    message: "New password must be different."

                });

            }

            if(newPassword.length < 8){

                return res.status(400).json({

                    message:"Password must contain at least 8 characters."

                });

            }

            const hashedPassword = await bcrypt.hash(

                newPassword,

                10

            );

            Settings.updatePassword(

                userId,

                hashedPassword,

                (err) => {

                    if (err) {

                        return res.status(500).json({

                            message: err.message

                        });

                    }

                    return res.status(200).json({

                        message: "Password changed successfully."

                    });

                }

            );

        }

    );

};

// =====================================================
// Get User Preferences
// =====================================================

exports.getPreferences = (req, res) => {

    const userId = req.user.id;

    Settings.getPreferences(

        userId,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    message: "User not found."

                });

            }

            return res.status(200).json(

                result[0]

            );

        }

    );

};

// =====================================================
// Update User Preferences
// =====================================================

exports.updatePreferences = (req, res) => {

    const userId = req.user.id;

    const {

        language,

        theme

    } = req.body;

    const validLanguages = [

        "English",

        "Telugu",

        "Hindi"

    ];

    const validThemes = [

        "Light",

        "Dark"

    ];

    if (

        !validLanguages.includes(language)

    ) {

        return res.status(400).json({

            message: "Invalid language."

        });

    }

    if (

        !validThemes.includes(theme)

    ) {

        return res.status(400).json({

            message: "Invalid theme."

        });

    }

    Settings.updatePreferences(

        userId,

        {

            language,

            theme

        },

        (err) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            return res.status(200).json({

                message: "Preferences updated successfully."

            });

        }

    );

};

// =====================================================
// Get Notification Settings
// =====================================================

exports.getNotifications = (req, res) => {

    const userId = req.user.id;

    Settings.getNotifications(

        userId,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    message: "User not found."

                });

            }

            return res.status(200).json(

                result[0]

            );

        }

    );

};

// =====================================================
// Update Notification Settings
// =====================================================

exports.updateNotifications = (req, res) => {

    const userId = req.user.id;

    const {

        notifyApplications,

        notifyAttendance,

        notifyPayments,

        notifyReports

    } = req.body;

    Settings.updateNotifications(

        userId,

        {

            notifyApplications,

            notifyAttendance,

            notifyPayments,

            notifyReports

        },

        (err) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            return res.status(200).json({

                message: "Notification settings updated successfully."

            });

        }

    );

};

// =====================================================
// Delete Account (Soft Delete)
// =====================================================

exports.deleteAccount = (req, res) => {

    const userId = req.user.id;

    Settings.deleteAccount(

        userId,

        (err) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            return res.status(200).json({

                message: "Account deleted successfully."

            });

        }

    );

};


exports.getMyProfile = async(req,res)=>{

    try{

        const labourId = req.user.id;

        const profile = await Settings.getLabourProfile(labourId);

        if(profile.length === 0){

            return res.status(404).json({

                message:"Profile not found"

            });

        }

        res.status(200).json(profile[0]);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};