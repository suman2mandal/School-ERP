import express from "express";
import { createStudent, deleteStudent, readOneStudent, readAllStudents, readStudents, updateStudent, readAllClassStudents } from "../controllers/studentController.js";

const router = express.Router();

// Create student
router.post('/register', createStudent);

// Update student
router.post("/student/:registerationNumber", updateStudent);

// Read all students (for developers)
router.get("/students", readStudents)

// Read all students - in the whole school
router.post("/allstudents", readAllStudents)

router.post("/readAllClassStudents", readAllClassStudents)

// Read one student
router.post("/onestudent", readOneStudent)

// Delete student
router.post("/deletestudent", deleteStudent)

export default router;
