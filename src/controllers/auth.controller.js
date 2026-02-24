import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUserService,loginUserService } from '../services/auth.service.js';
import { sendOtp } from '../services/otp.service.js';
export const createUser = async (req, res) => {
    try {
        const { name, location, email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            });
        }
        const newuser = await createUserService(name, location, email, password);
        await sendOtp(email);
        res.status(200).json({
            success: true,
            message: "User created. OTP sent to email. Please verify OTP.",
            data: newuser,
        });
    } catch (error) {
        console.error("Create User Error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message,
        });
    }
};

export const verifySignupOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('OTP verification request:', { email, otp });
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for OTP verification:', email);
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log('User found:', user);
        console.log('User OTP:', user.otp, 'User OTP Expiry:', user.otpExpiry, 'Current Time:', Date.now());
        if (user.otp !== otp) {
            console.log('OTP mismatch:', user.otp, otp);
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        if (Date.now() > user.otpExpiry) {
            console.log('OTP expired:', user.otpExpiry, Date.now());
            return res.status(400).json({ success: false, message: "Expired OTP" });
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        console.log('User verified and saved:', user);
        res.status(200).json({ success: true, message: "OTP verified. Signup complete." });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ success: false, message: "OTP verification failed", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUserService(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

