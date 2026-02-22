import { createUserSerivce, findUserById } from "../services/auth.service.js";
import { loginUserService } from "../services/auth.service.js";

export const createUser = async (req, res) => {
    try {
        const { name, location, email, password, id } = req.body;
        const existingUser = await findUserById(id);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            });
        }
        const newuser = await createUserSerivce(name, location, email, password);
        res.status(200).json({
            success: true,
            message: "User created successfully",
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
