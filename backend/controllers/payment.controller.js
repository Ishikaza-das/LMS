const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req,res) => {
    try {
        const { courseId, amount, instructorId } = req.body;
        const studentId = req.id;

        if(!courseId || !instructorId || !amount){
            return res.status(400).json({
                message:"Missing fields",
                success: false
            });
        }

        const session = await stripe.checkout.session.create({
            payment_method_types: ["card","upi"],
            mode : "payment",
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{name: `Course Purchase`},
                        unit_amount: amount *100,
                    },
                    quantity:1,
                },
            ],
            customer_email: req.user.email,
            success_url:`${process.env.FRONTEND}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND}/payment-cancel`,
        });

        await Payment.create({
            student: studentId,
            instructor: instructorId,
            course: courseId,
            amount,
            stripeSessionId: session.id,
        });

        res.status(200).json({
            url:session.url,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const verifyPayment = async (req,res) => {
    try {
        const {sessionId} = req.body;

        const session = await stripe.checkout.session.retrieve(sessionId);

        if(session.payment_status === "paid"){
            const payment = await Payment.findOne({ stripeSessionId: session.id});
            if(payment && payment.status !== "succeeded"){
                payment.status = "succeeded";
                await payment.save();

                await User.findByIdAndUpdate(payment.student,{
                    $push:{enrolledCourses: payment.course},
                })
            }
            return res.json({
                message:"Payment verified & course enrolled",
                success: true
            })
        } else {
            return res.status(400).json({
                message:"Payment not completed",
                success: false
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {createCheckoutSession, verifyPayment}