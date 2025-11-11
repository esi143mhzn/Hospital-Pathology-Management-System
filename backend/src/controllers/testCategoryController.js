import TestCategory from "../models/testCategoryModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createCategory = async (req, res, next) => {
    try {
        const Category = await TestCategory.create(req.body);
        if (!Category) return handleResponse(res, 404, "Category not found!");

        handleResponse(res, 200, "Category created successfully!", Category);
    } catch (err) {
        next(err);
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const Categories = await TestCategory.getAll(req);
        if (!Categories) return handleResponse(res, 404, "Category not found!");

        handleResponse(res, 200, "Category fetched successfully!", Categories);
    } catch (err) {
        next(err);
    }
}

export const getCategoryById = async (req, res, next) => {
    try {
        const Category = await TestCategory.getById(req.params.id);
        if (!Category) return handleResponse(res, 404, " Category not found!");

        handleResponse(res, 200, " Category fetched successfully!", Category);
    } catch (err) {
        next(err);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const updated = await TestCategory.update(req.params.id, req.body);
        if (!updated) return handleResponse(res, 404, " Category not found!");

        handleResponse(res, 200, " Category updated successfully!", updated);
    } catch (err) {
        next(err);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const deleted = await TestCategory.delete(req.params.id);
        if (!deleted) return handleResponse(res, 404, " Category not found!");

        handleResponse(res, 200, " Category deleted successfully!", deleted);
    } catch (err) {
        next(err);
    }
}