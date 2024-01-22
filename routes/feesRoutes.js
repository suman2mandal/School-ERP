import express from "express";
import { addFees, deleteFees, readFees, updateFees } from "../controllers/feesController.js";

const router = express.Router();

// Add fees
router.post('/addfees', addFees);

// Update fees
router.put('/updatefees', updateFees);

// Read fees
router.get('/readfees', readFees)

// Delete fees
router.delete('/deletefees', deleteFees)

export default router;
