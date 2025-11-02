import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

dotenv.config();

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) return handleResponse(res, 400, "User already exists!", existingUser.email);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.createUser({name, email, password: hashedPassword, role});
        handleResponse(res, 201, "User created successfully!", newUser);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findByEmail(email);
        if (!user) return handleResponse(res, 404, "User not found!");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return handleResponse(res, 401, "Invalid password!");

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        handleResponse(res, 200, "User login successful!", {token, role: user.role, name: user.name});

    } catch (error) {
        next(error);
    }
}