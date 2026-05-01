const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register controller
async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
};

// Login controller
async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        // console.log('Login request received with:', { username, email, password });
        const user = await userModel.findOne({
            $or:[
                { email },
                { username }
            ]
        });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or username, credentials do not match any user'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password, credentials do not match any user'
            });
        }
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: '1h' 
            }
        );
        res.cookie("token", token);
        res.status(200).json({
            message: 'User Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
};

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: 'User logged out successfully'
    });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser
};