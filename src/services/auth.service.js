import User from "../models/User.js";

export const createUserSerivce = async (name, location, email, password) => {
    try {
        const newuser = await User.create({
            name,
            location,
            email,
            password,
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
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        throw error;
    }
};