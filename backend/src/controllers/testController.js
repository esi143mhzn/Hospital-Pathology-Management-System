import TestModel from "../models/testModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createTest = async (req, res, next) => {
    try {
        const test = await TestModel.create(req.body);
        if(!test) return handleResponse(res, 404, "Test not found!");

        handleResponse(res, 200, "Test created successfully!", test);
    } catch (err) {
        next(err);
    }
}

export const getTests = async (req, res, next) => {
    try {
        const tests = await TestModel.getAll(req);
        handleResponse(res, 200, "All Tests fetched successfully!", tests);
    } catch (err) {
        next(err);
    }
}

export const getTestById = async (req, res, next) => {
    try {
        const test = await TestModel.getById(req.params.id);
        if(!test) return handleResponse(res, 404, "Test not found!");

        handleResponse(res, 200, "All Tests fetched successfully!", test);
    } catch (err) {
        next(err);
    }
}

export const updateTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await TestModel.update(id, req.body);
        if(!updated) return handleResponse(res, 404, "Test not found!");

        handleResponse(res, 200, "Test updated successfully!", updated);
    } catch (err) {
        next(err);
    }
}

export const deleteTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await TestModel.delete(id);
        if(!deleted) return handleResponse(res, 404, "Test not found!");

        handleResponse(res, 200, "Test deleted successfully!", deleted);
    } catch (err) {
        next(err);
    }
}