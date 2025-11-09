import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/userController.js";
import { authorizeRoles, verifyToken } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/", verifyToken, authorizeRoles("admin"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;