import express from "express";
import { addFees, deleteFees, readFees, updateFees } from "../controllers/feesController.js";

const router = express.Router();

// Add fees
router.post('/addfees', addFees);

// Update fees
router.post('/updatefees', updateFees);

// Read fees
router.post('/readfees', readFees)

// Delete fees
router.post('/deletefees', deleteFees)

export default router;
