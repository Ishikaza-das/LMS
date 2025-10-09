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
    console.error("⚠️ Webhook signature verification failed:", err.message);
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

        console.log("✅ Payment verified and course enrolled.");
      }
    } catch (error) {
      console.error("❌ Webhook processing error:", error);
    }
  }

  res.json({ received: true });
};

module.exports = { stripeWebhook };
