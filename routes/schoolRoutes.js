import express from "express"
import { addSchool, loginSchool } from "../controllers/schoolController.js"

const router = express.Router()

// Add school details
router.post('/addschool', addSchool)

// Get school details
router.post('/loginschool', loginSchool)


export default router