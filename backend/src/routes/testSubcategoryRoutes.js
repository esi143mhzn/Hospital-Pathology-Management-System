import express from "express";
import { createSubCategory, deleteSubCategory, getSubCategories, getSubCategoryById, updateSubCategory } from "../controllers/testSubcategoryController.js";

const router = express.Router();


router.get("/", getSubCategories);
router.post("/create", createSubCategory);
router.get("/:id", getSubCategoryById);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
