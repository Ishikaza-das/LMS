const User = require('../models/user.model');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {fullname, email, password, role} = req.body;
        if(!fullname || !email || !password || !role){
            return res.status(400).json({
                message:'Something is missing',
                success: false
            });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User already exist with this email',
                success: false,
            });
        }

        const hashedPassword = await Bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            role,
            // profilephoto
        });
        return res.status(201).json({
            message:'Account created successfully',
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}

const login = async ( req,res) => {
    try {
        const {email, password, role} = req.body;
        if(!email, !password, !role){
            return res.status(400).json({
                message:'Something is missing',
                success: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'Incorrect email',
                success: false,
            });
        }
        const isPasswordMatch = await Bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'Incorrect password',
                success: false
            });
        }
        if(role != user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        } ;
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{
            expiresIn: "1d",
        });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            role:user.role,
            profilephoto:user.profilephoto
        }

        return res.status(200).cookie('token',token,{
            maxAge: 1*21*60*60*1000,
            httpOnly: true,
            sameSite:"None",
            secure:true
        }).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            success: false
        });
    }
};

const getMe = async(req,res) => {
    try {
        const user = await User.findById(req.id).select('-password');
        return res.status(200).json({
            success:true,
            user
        });      
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching user',
            success: false
        });
    }
};

const logout = async (req, res) => {
    try {
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logout successfully",
        success: true
       }) 
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = {register, login, getMe, logout};