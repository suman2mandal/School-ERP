import StudentFees from "../models/studentFeesModel"
import readStudents from "../controllers/studentController"
import Student from "../models/studentModel"
import asyncHandler from "express-async-handler"

const validateRequiredFields = (body, requiredFields) => {
    return requiredFields.every(field => body[field])
};

const receiveFees = asyncHandler(async (req, res) => {

    const { registerationNumber } = await req.body
    if (!registerationNumber) {
        res.status(400).json({ error: "Please enter the registeration number" })
    }

    const student = await Student.findOne({ registerationNumber })

    if (student) {
        studentName = student.studentName
        studentClass = student.studentClass
        fatherName = student.fatherName
        studentSection = student.section
    }

    else {
        res.status(404).json({ error: "No student found with this registeration number" })
    }


})
