import express from "express"
import { addSchool } from "../controllers/schoolController.js"

const router = express.Router()

// Add school details
router.post('/addschool', addSchool)

export default router