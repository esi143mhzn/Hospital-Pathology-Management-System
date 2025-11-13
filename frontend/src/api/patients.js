import api from "./api";

export const getAllPatients = () => api.get("/patient");
export const getPatientById = (id) => api.get(`/patient/${id}`);
export const createPatient = (data) => api.post("/patient/create", data);
export const updatePatient = (id, data) => api.put(`/patient/${id}`, data);
export const deletePatient = (id) => api.delete(`/patient/${id}`);