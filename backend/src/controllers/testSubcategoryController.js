import TestSubCategory from "../models/testSubCategoryModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createSubCategory = async (req, res, next) => {
    try {
        const subCategory = await TestSubCategory.create(req.body);
        if (!subCategory) return handleResponse(res, 404, "SubCategory not found!");

        handleResponse(res, 200, "SubCategory created successfully!", subCategory);
    } catch (err) {
        next(err);
    }
}

export const getSubCategories = async (req, res, next) => {
    try {
        const subCategories = await TestSubCategory.getAll(req);
        if (!subCategories) return handleResponse(res, 404, "SubCategory not found!");

        handleResponse(res, 200, "SubCategory fetched successfully!", subCategories);
    } catch (err) {
        next(err);
    }
}

export const getSubCategoryById = async (req, res, next) => {
    try {
        const subCategory = await TestSubCategory.getById(req.params.id);
        if (!subCategory) return handleResponse(res, 404, "SubCategory not found!");

        handleResponse(res, 200, "SubCategory fetched successfully!", subCategory);
    } catch (err) {
        next(err);
    }
}

export const updateSubCategory = async (req, res, next) => {
    try {
        const updated = await TestSubCategory.update(req.params.id, req.body);
        if (!updated) return handleResponse(res, 404, "SubCategory not found!");

        handleResponse(res, 200, "SubCategory updated successfully!", updated);
    } catch (err) {
        next(err);
    }
}

export const deleteSubCategory = async (req, res, next) => {
    try {
        const deleted = await TestSubCategory.delete(req.params.id);
        if (!deleted) return handleResponse(res, 404, "SubCategory not found!");

        handleResponse(res, 200, "SubCategory deleted successfully!", deleted);
    } catch (err) {
        next(err);
    }
}