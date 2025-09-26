const express = require('express');
const isAuthenticated = require('../middleware/authenticated');
const { createCheckoutSession, verifyPayment } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
router.post("/verify-payment",isAuthenticated,verifyPayment);

module.exports = router;