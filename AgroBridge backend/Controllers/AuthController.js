// const User = require("../models/Users");

// exports.register = async(req, res) =>{
//     const userData = req.body;

//     if( !email || !password || !role)

// }

const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");


// ================= REGISTER =================          

exports.register = async (req, res) => {

    try {


        const userData = req.body;
        console.log(req.body);
        console.log(req.file);

        if (req.file) {
            userData.photo = req.file.filename;
        }

        // Common Validation

        if (
            !userData.name||
            !userData.email ||
            !userData.password ||
            !userData.role
        ) {
            return res.status(400).json({
                message: "Email, Password and Role are required"
            });
        }

        if (userData.role !== "farmer" && userData.role !== "labourer") {
            return res.status(403).json({
                message: "Invalid role."
            });
        }

        // Labour Validation

        if (userData.role === "labourer") {

            if (
                !userData.age ||
                !userData.village ||
                !userData.skills ||
                !userData.phone||
                !req.file
            ) {
                return res.status(400).json({
                    message: "Please fill all labour details"
                });
            }

        }

        // Farmer Validation
                                                           
        if (userData.role === "farmer") {

            if (
                !userData.farmtype ||
                !userData.village ||
                !userData.farmsize ||
                !userData.noofworkers ||
                !userData.worktype ||
                !req.file
            ) {
                return res.status(400).json({
                    message: "Please fill all farmer details"
                });
            }

        }

        // Check Existing Email
        console.log("Checking email...");

        User.findByEmail(userData.email, async (err, result) => {
             console.log("findByEmail called");
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
            // res.status(200).json(result);

            // Hash Password

            userData.password =
                await bcrypt.hash(
                    userData.password,
                    10
                );

            // Create User
                console.log("Creating user...");
            User.create(userData, (err, result) => {
                console.log("Create callback called");
                if (err) {
                    return res.status(500).json(err);
                }
                if(userData.role === "labourer") { 
                    return res.status(201).json({
                        message: "Labour Registration Successful"
                    });
                }
                else if(userData.role === "farmer"){
                    return res.status(201).json({
                        message: "Farmer Registration Successful"
                    });
                }

            }); 

        });

    }
    catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


// ================= LOGIN =================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and Password required"
            });

        }

        // Find User

        User.findByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            const user = result[0];
            if (!user.password) {
                return res.status(500).json({
                    message: "User password is missing from database query."
                });
            }

            // Compare Password

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }


            if(user.status==="pending" && user.name != "Admin"){

                return res.status(403).json({

                message:"Waiting for admin approval."

                });

                }

            if(user.status==="rejected"){

                return res.status(403).json({

                message:"Registration rejected."

                });

            }

            // Generate JWT

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            // Response

            return res.status(200).json({

                message: "Login Successful",

                token,

                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }

            });

        });

    }
    catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

exports.getAllUsers = (req, res) => {

    User.getAllUsers((err, users) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(users);

    });
    // const userId = req.user.id;


};

exports.getUserById = (req, res) => {

    const { id } = req.params;

    User.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(result[0]);

    });

};

exports.updateUserStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const validStatus = [
        "pending",
        "Approved",
        "Rejected"
    ];

    if(!validStatus.includes(status)){

        return res.status(400).json({

            message:"Invalid status."

        });

    }

    if (!status) {

        return res.status(400).json({
            message: "Status is required"
        });

    }

    User.updateStatus(id, status, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.status(200).json({
            message: "User Status Updated Successfully"
        });

    });

};

exports.deleteUser = (req, res) => {

    const { id } = req.params;

    User.deleteUser(
        id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                message: "User Deleted"
            });

        }
    );

};

exports.getLoggedInUser = (req, res) => {

    const userId = req.user.id;

    User.findById(userId, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(result[0]);

    });

};

exports.logout = (req, res) => {

    try {

        return res.status(200).json({

            success: true,
            message: "Logged out successfully."

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Logout failed."

        });

    }

};