const Stripe = require("stripe");
const User = require("../models/user.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createConnectAccount = async (req, res) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "Unauthorized: no user ID found",
        success: false,
      });
    }

    const user = await User.findById(req.id);

    if (!user || user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can connect to Stripe",
        success: false,
      });
    }

    if (!user.stripeAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      });

      user.stripeAccountId = account.id;
      await user.save();
    }

    const accountLink = await stripe.accountLinks.create({
      type: "account_onboarding",
      account: user.stripeAccountId,
      refresh_url: `${process.env.FRONTEND}/onboarding-failed`,
      return_url: `${process.env.FRONTEND}/onboarding-success`,
    });

    res.status(200).json({
      url: accountLink.url,
      success: true,
      user
    });
  } catch (error) {
    console.error("Stripe Connect Error:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createConnectAccount };
