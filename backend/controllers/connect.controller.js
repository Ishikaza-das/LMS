const Stripe = require("stripe");
const User = require("../models/user.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createConnectAccount = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if(!user || user.role !== "instructor"){
            return res.status(403).json({
                message:"Only instructors can connect to Stripe",
                success: false
            })
        }

        if(!user.stripeAccountId){
            const account = await stripe.accounts.create({
                type:"express",
                email:user.email,
            });

            user.stripeAccountId = account.id;
            await user.save();
        }

        const accountLink = await stripe.accountLinks.create({
            account: user.stripeAccountId,
            refresh_url:`${process.env.FRONTEND}/onboarding-failed`,
            return_url:`${process.env.FRONTEND}//onboarding-success`,
            type: "account_onboarding",
        });

        res.status(200).json({
            url:accountLink.url,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {createConnectAccount};