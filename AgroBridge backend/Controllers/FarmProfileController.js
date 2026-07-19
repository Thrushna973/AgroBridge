const FarmProfile = require("../models/FarmProfile");

// =====================================================
// Create Farm Profile
// =====================================================

exports.createProfile = (req, res) => {

    const profile = req.body;

    profile.farmerId = req.user.id;

    // Required Fields Validation
    if (
        !profile.farmName ||
        !profile.ownerName ||
        !profile.farmType ||
        !profile.totalArea ||
        !profile.village
    ) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    // Prevent Duplicate Profile
    FarmProfile.findByFarmerId(

        profile.farmerId,

        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (rows.length > 0) {

                return res.status(400).json({
                    message: "Farm profile already exists."
                });

            }

            FarmProfile.createProfile(

                profile,

                (err) => {

                    if (err) {

                        return res.status(500).json({
                            message: err.message
                        });

                    }

                    return res.status(201).json({

                        message: "Farm profile created successfully."

                    });

                }

            );

        }

    );

};

// =====================================================
// Get Logged-in Farmer Profile
// =====================================================

exports.getProfile = (req, res) => {

    FarmProfile.getProfile(

        req.user.id,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    message: "Farm profile not found."

                });

            }

            return res.status(200).json(

                result[0]

            );

        }

    );

};

// =====================================================
// Update Farm Profile
// =====================================================

exports.updateProfile = (req, res) => {

    const profile = req.body;

    profile.farmerId = req.user.id;

    if (
        !profile.farmName ||
        !profile.ownerName
    ) {

        return res.status(400).json({

            message: "Farm Name and Owner Name are required."

        });

    }

    FarmProfile.findByFarmerId(

        profile.farmerId,

        (err, rows) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (rows.length === 0) {

                return res.status(404).json({

                    message: "Farm profile not found."

                });

            }

            FarmProfile.updateProfile(

                profile,

                (err) => {

                    if (err) {

                        return res.status(500).json({

                            message: err.message

                        });

                    }

                    return res.status(200).json({

                        message: "Farm profile updated successfully."

                    });

                }

            );

        }

    );

};

// =====================================================
// Upload Farm Photo
// =====================================================

exports.uploadPhoto = (req, res) => {

    if (!req.file) {

        return res.status(400).json({

            message: "Please select a photo."

        });

    }

    FarmProfile.findByFarmerId(

        req.user.id,

        (err, rows) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (rows.length === 0) {

                return res.status(404).json({

                    message: "Farm profile not found."

                });

            }

            FarmProfile.updatePhoto(

                req.user.id,

                req.file.filename,

                (err) => {

                    if (err) {

                        return res.status(500).json({

                            message: err.message

                        });

                    }

                    return res.status(200).json({

                        message: "Farm photo uploaded successfully.",

                        photo: req.file.filename

                    });

                }

            );

        }

    );

};

// =====================================================
// Delete Farm Profile (Optional)
// =====================================================

exports.deleteProfile = (req, res) => {

    FarmProfile.findByFarmerId(

        req.user.id,

        (err, rows) => {

            if (err) {

                return res.status(500).json({

                    message: err.message

                });

            }

            if (rows.length === 0) {

                return res.status(404).json({

                    message: "Farm profile not found."

                });

            }

            FarmProfile.deleteProfile(

                req.user.id,

                (err) => {

                    if (err) {

                        return res.status(500).json({

                            message: err.message

                        });

                    }

                    return res.status(200).json({

                        message: "Farm profile deleted successfully."

                    });

                }

            );

        }

    );

};