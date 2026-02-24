// Controller for OTP endpoints
import { sendOtp, verifyOtp } from '../services/otp.service.js';

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    await sendOtp(email);
    res.status(200).json({ message: 'OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const valid = await verifyOtp(email, otp);
    if (valid) {
      res.status(200).json({ message: 'OTP verified.' });
    } else {
      res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'OTP verification failed.' });
  }
};
