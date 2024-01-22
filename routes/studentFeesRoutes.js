import express from "express";
import { receiveFees, readFees, getTotalBalance, updateFees, deleteFees, getAllStudentBalances } from "../controllers/studentFeesController.js";

const router = express.Router();

// Create fees record
router.post('/receivefees', receiveFees);

// Read fees records
router.post('/readfees', readFees);

// Get total balance for a student
router.post('/totalbalance', getTotalBalance);

// Update fees record
router.put('/updatefees/:id', updateFees); // Assuming you pass fees record ID in the URL

// Delete fees record
router.delete('/deletefees/:id', deleteFees); // Assuming you pass fees record ID in the URL

// Get all students with their current balances
router.get('/allbalance', getAllStudentBalances);

export default router;
