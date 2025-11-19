import express from "express";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { createTest, deleteTest, getTestById, getTests, updateTest } from "../controllers/testController.js";

const router = express.Router();

router.use(verifyToken);
router.post("/create", createTest);
router.get("/", getTests);
router.get("/:id", getTestById);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

export default router;