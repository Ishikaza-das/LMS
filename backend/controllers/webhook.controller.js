const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET 
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const payment = await Payment.findOne({ stripeSessionId: session.id });
      if (payment && payment.status !== "completed") {
        payment.status = "completed";
        await payment.save();

        await User.findByIdAndUpdate(payment.student, {
          $push: { enrolledCourses: payment.course },
        });

        console.log("Payment verified and course enrolled.");
      }
    } catch (error) {
      console.error("Webhook processing error:", error);
    }
  }

  res.json({ received: true });
};

const getPaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const payment = await Payment.findOne({ stripeSessionId: sessionId });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    return res.json({
      success: payment.status === "completed",
      message: payment.status === "completed" ? "Payment verified & course enrolled" : "Payment not completed"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { stripeWebhook, getPaymentStatus };
