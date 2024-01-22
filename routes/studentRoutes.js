import express from "express";
import { createStudent, deleteStudent, readOneStudent, readAllStudents, readAllStudentsOfaSchool, updateStudent, readAllClassStudents } from "../controllers/studentController.js";

const router = express.Router();

router.post('/register', createStudent);
router.get("/oneStudent", readOneStudent);
router.get("/allStudents", readAllStudents)
router.get("/allStudentsOfaSchool", readAllStudentsOfaSchool)
router.get("/readAllClassStudent", readAllClassStudents)
router.post("/updateStudent", updateStudent);
router.delete("/deleteStudent", deleteStudent)

export default router;
