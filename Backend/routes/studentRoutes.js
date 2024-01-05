import express from "express";
import { createStudent, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

// Create student
router.post('/register', createStudent);

// Update student
router.post("/student/:registerationNumber", updateStudent);

export default router;
