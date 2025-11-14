import api from "./api";

export const getAllTest = () => api.get("/test");
export const getTestById = (id) => api.get(`/test/${id}`);
export const createTest = (data) => api.post("/test/create", data);
export const updateTest = (id, data) => api.put(`/test/${id}`, data);
export const deleteTest = (id) => api.delete(`/test/${id}`);