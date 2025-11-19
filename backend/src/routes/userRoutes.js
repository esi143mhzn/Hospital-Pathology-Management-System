import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/userController.js";
import { authorizeRoles, verifyToken } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createUser);
router.post("/login", loginUser);
router.get("/", verifyToken, authorizeRoles("admin"), getAllUsers);
router.get("/:id", verifyToken, authorizeRoles("admin"), getUserById);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateUser);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;