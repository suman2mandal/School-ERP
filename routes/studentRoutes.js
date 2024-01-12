import express from "express";
import { createStudent, deleteStudent, readOneStudent, readAllStudents, readStudents, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

// Create student
router.post('/register', createStudent);

// Update student
router.post("/student/:registerationNumber", updateStudent);

// Read all students with class and school
router.post("/students", readStudents)

// Read all students - in the whole school
router.post("/allstudents", readAllStudents)

// Read one student
router.post("/onestudent", readOneStudent)

// Delete student
router.post("/deletestudent", deleteStudent)

export default router;
