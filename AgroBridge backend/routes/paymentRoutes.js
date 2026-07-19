const express = require("express");
const router = express.Router();

const PaymentController = require("../Controllers/PaymentController");
const { route } = require("./jobRoutes");

router.post("/payments", PaymentController.createPayment);

router.get("/payment/:id", PaymentController.getPaymentById);

router.get("/payment/farmer/:farmerId", PaymentController.getFarmerPayments);

router.get("/payments/labourer/:labourerId", PaymentController.getLabourerPayments);

router.put("/payments/:id/status", PaymentController.updatePaymentStatus);

module.exports = router;