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