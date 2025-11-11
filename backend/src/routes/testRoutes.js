import express from "express";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { createTest, getTests, updateTest } from "../controllers/testController.js";

const router = express.Router();

router.use(verifyToken);
router.post("/create", createTest);
router.get("/", getTests);
router.put("/:id", updateTest);

export default router;