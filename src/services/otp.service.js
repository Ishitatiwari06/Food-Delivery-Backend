// Service for OTP generation, storage, and verification
import crypto from 'crypto';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/emailSender.js';

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (email) => {
  const otp = generateOtp();
  const expiry = Date.now() + 10 * 60 * 1000;
  await User.findOneAndUpdate({ email }, { otp, otpExpiry: expiry });
  await sendOtpEmail(email, otp);
  return otp;
};

export const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
    return false;
  }
  // Clear OTP after verification
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  return true;
};
