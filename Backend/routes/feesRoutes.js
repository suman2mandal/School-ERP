import express from "express";
import { addFees, updateFees } from "../controllers/feesController.js";

const router = express.Router();

// Add fees
router.post('/addfees', addFees);

// Update fees
router.post('/updatefees/:studentClass', updateFees);

export default router;
