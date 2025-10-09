const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { courseId, amount, instructorId } = req.body;
    const studentId = req.id;

    if (!courseId || !instructorId || !amount) {
      return res.status(400).json({
        message: "Missing fields",
        success: false,
      });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        success: false,
      });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor?.stripeAccountId) {
      return res.status(400).json({
        message: "Instructor not connected to Stripe",
        success: false,
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    const platformFeePercentage = 10;
    const platformFeeAmount = Math.round(
      ((amount * platformFeePercentage) / 100) * 100
    );

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.title,
                images: [course.thumbnail],
              },
              unit_amount: course.price * 100,
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: platformFeeAmount,
        },
        customer_email: student.email,
        success_url: `${process.env.FRONTEND}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND}/payment-cancel`,
      },
      {
        stripeAccount: instructor.stripeAccountId,
      }
    );

    await Payment.create({
      student: studentId,
      instructor: instructorId,
      course: courseId,
      amount,
      stripeSessionId: session.id,
    });

    res.status(200).json({
      url: session.url,
      success: true,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createCheckoutSession };
