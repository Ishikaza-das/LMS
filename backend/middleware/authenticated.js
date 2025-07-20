const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success: false
            });
        };
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid token',
                success: false
            });
        };
        const user = await User.findById(decode.userId).select('-password');
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        req.id = decode.userId;
        req.role = user.role;
        next();        
    } catch (error) {
        res.status(400).json({
            message:`middleware error ${error.message}`
        });
    };
};

module.exports = isAuthenticated