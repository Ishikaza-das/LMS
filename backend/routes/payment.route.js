const express = require('express');
const isAuthenticated = require('../middleware/authenticated');
const { createCheckoutSession } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);

module.exports = router;