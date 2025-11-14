import api from "./api";

export const getAllMainCategories = () => api.get("/main-category");
export const getMainCategoryById = (id) => api.get(`/main-category/${id}`);
export const createMainCategory = (data) => api.post("/main-category/create", data);
export const updateMainCategory = (id, data) => api.put(`/main-category/${id}`, data);
export const deleteMainCategory = (id) => api.delete(`/main-category/${id}`);