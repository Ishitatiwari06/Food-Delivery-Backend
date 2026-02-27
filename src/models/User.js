import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String
        },
        otpExpiry: {
            type: Date
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
);
const User = mongoose.model('User', userSchema);
export default User;