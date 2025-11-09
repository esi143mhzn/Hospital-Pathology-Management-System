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

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.getUsers(req);
        handleResponse(res, 200, "Users fetched successfully!", users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.getUsersById(id);
        if(!user) return handleResponse(res, 404, "User not found!", user);
        handleResponse(res, 200, "User fetched successfully!", user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {name, email, role, password } = req.body;
    try {
        const existingUser = await UserModel.getUsersById(id);
        if (!existingUser) return handleResponse(res, 400, "User not found!");

        let hashedPassword;
        password ? hashedPassword = await bcrypt.hash(password, 10) : hashedPassword = existingUser.password
        
        const updatedUser = await UserModel.updateUsers(id, { name, email, role, password: hashedPassword});
        if(!updatedUser) return handleResponse(res, 404, "User not found!", updatedUser);
        handleResponse(res, 200, "User updated successfully!", updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await UserModel.deleteUsers(req.params.id);
        if(!deletedUser) return handleResponse(res, 404, "User not found!", deletedUser);
        handleResponse(res, 200, "User deleted successfully!", deletedUser);
    } catch (err) {
        next(err);
    }
};