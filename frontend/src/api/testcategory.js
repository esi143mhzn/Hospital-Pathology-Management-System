import api from "./api";

export const getAllCategories = () => api.get("/category");
export const getCategoryById = (id) => api.get(`/category/${id}`);
export const createCategory = (data) => api.post("/category/create", data);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);