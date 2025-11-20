import api from "./api";

export const getAllBills = () => api.get("/billing");
export const getBillById = (id) => api.get(`/billing/${id}`);
export const createBill = (data) => api.post("/billing/create", data);
export const updateBill = (id, data) => api.put(`/billing/${id}`, data);
export const deleteBill = (id) => api.delete(`/billing/${id}`);
export const deleteBillItem = (id) => api.delete(`/billing/bill-item/${id}`);