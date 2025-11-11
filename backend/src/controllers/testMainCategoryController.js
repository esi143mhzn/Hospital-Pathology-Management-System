import TestMainCategory from "../models/testMainCategoryModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createMainCategory = async (req, res, next) => {
    try {
        const mainCategory = await TestMainCategory.create(req.body);
        if (!mainCategory) return handleResponse(res, 404, "MainCategory not found!");

        handleResponse(res, 200, "MainCategory created successfully!", mainCategory);
    } catch (err) {
        next(err);
    }
}

export const getMainCategories = async (req, res, next) => {
    try {
        const mainCategories = await TestMainCategory.getAll(req);
        if (!mainCategories) return handleResponse(res, 404, "MainCategory not found!");

        handleResponse(res, 200, "MainCategory fetched successfully!", mainCategories);
    } catch (err) {
        next(err);
    }
}

export const getMainCategoryById = async (req, res, next) => {
    try {
        const mainCategory = await TestMainCategory.getById(req.params.id);
        if (!mainCategory) return handleResponse(res, 404, "Main Category not found!");

        handleResponse(res, 200, "Main Category fetched successfully!", mainCategory);
    } catch (err) {
        next(err);
    }
}

export const updateMainCategory = async (req, res, next) => {
    try {
        const updated = await TestMainCategory.update(req.params.id, req.body);
        if (!updated) return handleResponse(res, 404, "Main Category not found!");

        handleResponse(res, 200, "Main Category updated successfully!", updated);
    } catch (err) {
        next(err);
    }
}

export const deleteMainCategory = async (req, res, next) => {
    try {
        const deleted = await TestMainCategory.delete(req.params.id);
        if (!deleted) return handleResponse(res, 404, "Main Category not found!");

        handleResponse(res, 200, "Main Category deleted successfully!", deleted);
    } catch (err) {
        next(err);
    }
}