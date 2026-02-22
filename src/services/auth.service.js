import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUserSerivce = async (name, location, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
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

