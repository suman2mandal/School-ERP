const express = require("express")
const { createStudent, updateStudent } = require("../controllers/studentController")
const router = express.Router()

// Create student
router.post('/register', createStudent)

// Update student
router.post("/student/:registerationNumber", updateStudent)

module.exports = router