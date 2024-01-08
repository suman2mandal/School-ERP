import express from "express";
import { createEmp, deleteEmp, readEmployees, readSingleEmp, updateEmp } from "../controllers/empController.js";

const router = express.Router()

// Creat employee
router.post('/addemp', createEmp)

// Update employee
router.post('/updateemp/:empId', updateEmp)

// Read employees
router.post('/reademployees', readEmployees)

// Read single emp
router.post('/singleemp', readSingleEmp)

// Delete employee
router.post('/deleteemp', deleteEmp)
export default router