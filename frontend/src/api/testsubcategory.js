import api from "./api";

export const getAllSubCategories = () => api.get("/sub-category");
export const getSubCategoryById = (id) => api.get(`/sub-category/${id}`);
export const createSubCategory = (data) => api.post("/sub-category/create", data);
export const updateSubCategory = (id, data) => api.put(`/sub-category/${id}`, data);
export const deleteSubCategory = (id) => api.delete(`/sub-category/${id}`);