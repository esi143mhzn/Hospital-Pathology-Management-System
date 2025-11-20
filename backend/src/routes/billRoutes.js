import express from "express";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { createBill, deleteBill, deleteBillItem, getBillById, getBills, updateBill } from "../controllers/billController.js";

const router = express.Router();

router.use(verifyToken);
router.post("/create", createBill);
router.get("/", getBills);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);
router.delete("/bill-item/:id", deleteBillItem);

export default router;