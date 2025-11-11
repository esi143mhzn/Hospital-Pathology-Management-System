import PatientModel from "../models/patientModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createPatient = async (req, res, next) => {
    try {
        const newPatient = await PatientModel.create(req.body);
        handleResponse(res, 201, "Patient created successfully!", newPatient);
    } catch (err) {
        next(err);
    }
};

export const getPatients = async (req, res, next) => {
    try {
        const patients = await PatientModel.getAll();
        handleResponse(res, 201, "Patients fetched successfully!", patients);
    } catch (err) {
        next(err);
    }
}

export const getPatientById = async (req, res, next) => {
    try {
        const patient = await PatientModel.getById(req.params.id);
        if(!patient) return handleResponse(res, 404, "Patient not found!");
        handleResponse(res, 201, "Patient fetched successfully!", patient);
    } catch (err) {
        next(err);
    }
}

export const updatePatient = async (req, res, next) => {
    try {
        const { name, address, identity, age, gender } = req.body;
        const { id } = req.params;

        // const existingPatient = await PatientModel.getUsersById(id);
        // if (!existingPatient) return handleResponse(res, 400, "Patient not found!");

        const updatePatient = await PatientModel.update(id, req.body);
        if(!updatePatient) return handleResponse(res, 404, "Patient not found!");

        handleResponse(res, 200, "Patient updated successfully!", updatePatient);
        
    } catch (err) {
        next(err);
    }
}

export const deletePatient =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const patient = await PatientModel.delete(id);
        if(!patient) return handleResponse(res, 404, "Patient not found!");

        handleResponse(res, 200, "Patient deleted successfully!");
    } catch (err) {
        next(err);
    }
}