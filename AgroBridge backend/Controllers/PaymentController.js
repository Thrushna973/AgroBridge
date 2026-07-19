const Payment = require("../models/Payments");


// Create Payment
exports.createPayment = (req, res) => {

    const paymentData = req.body;

    if (
        !paymentData.jobId ||
        !paymentData.farmerId ||
        !paymentData.labourerId ||
        !paymentData.amount
    ) {

        return res.status(400).json({
            message: "Required payment fields missing"
        });

    }

    Payment.create(
        paymentData,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(201).json({
                message: "Payment Created Successfully",
                paymentId: result.insertId
            });

        }
    );

};


// Get Payment By ID
exports.getPaymentById = (req, res) => {

    const { id } = req.params;

    Payment.findById(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Payment Not Found"
                });

            }

            res.status(200).json(result[0]);

        }
    );

};


// Farmer Payment History
exports.getFarmerPayments = (req, res) => {

    const { farmerId } = req.params;

    Payment.findByFarmerId(
        farmerId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json(result);

        }
    );

};


// Labourer Payment History
exports.getLabourerPayments = (req, res) => {

    const { labourerId } = req.params;

    Payment.findByLabourerId(
        labourerId,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json(result);

        }
    );

};


// Update Payment Status
exports.updatePaymentStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    Payment.updateStatus(
        id,
        status,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(200).json({
                message: "Payment Status Updated Successfully"
            });

        }
    );

};