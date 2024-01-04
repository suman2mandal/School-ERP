const express = require("express")
const { createStudent } = require("../controllers/studentController")
const router = express.Router()

// Create student
router.post('/register', createStudent)

module.exports = router