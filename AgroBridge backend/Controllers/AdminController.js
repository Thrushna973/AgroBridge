const Admin = require("../models/Admin");

exports.getDashboardStats = (req, res) => {

    Admin.getDashboardStats((err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.status(200).json(result[0]);

    });

};