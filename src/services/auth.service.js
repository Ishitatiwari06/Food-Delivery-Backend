
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUserService = async (name, location, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({
            name,
            location,
            email,
            password: hashedPassword,
        });
        return newuser;
    } catch (error) {
        throw error;
    }
};


export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isVerified) {
            throw new Error("User is not verified. Please verify your email before logging in.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return { user, token };
    } catch (error) {
        throw error;
    }
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

