import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const userHeader = req.headers.authorization;
    if(!userHeader) return res.status(403).json({message: "No token provided."});

    const token = userHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({message: "Invalid token"});
        req.user = decoded;
        next();
    })
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: "Access Denied"});
        }
        next();
    }
}