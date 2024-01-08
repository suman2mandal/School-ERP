import express from "express";
import { createStudent, deleteStudent, readOneStudent, readStudents, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

// Create student
router.post('/register', createStudent);

// Update student
router.post("/student/:registerationNumber", updateStudent);

// Read all students
router.post("/allstudents", readStudents)

// Read one student
router.post("/onestudent", readOneStudent)

// Delete student
router.post("/deletestudent", deleteStudent)

export default router;
