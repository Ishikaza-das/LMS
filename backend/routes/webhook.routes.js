const express = require("express");
const { stripeWebhook, getPaymentStatus } = require("../controllers/webhook.controller");

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
router.get("/payment-status/:sessionId", getPaymentStatus);

module.exports = router;
