import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/testCategoryController.js";

const router = express.Router();


router.get("/", getCategories);
router.post("/create", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
