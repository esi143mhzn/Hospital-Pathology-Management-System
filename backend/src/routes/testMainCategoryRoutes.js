import express from "express"
import { verifyToken } from "../middlewares/userMiddleware.js";
import { createMainCategory, deleteMainCategory, getMainCategories, getMainCategoryById, updateMainCategory } from "../controllers/testMainCategoryController.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getMainCategories);
router.post("/create", createMainCategory);
router.get("/:id", getMainCategoryById);
router.put("/:id", updateMainCategory);
router.delete("/:id", deleteMainCategory);

export default router;