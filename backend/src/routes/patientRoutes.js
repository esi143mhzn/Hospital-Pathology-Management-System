import express from "express";
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.post("/create", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;