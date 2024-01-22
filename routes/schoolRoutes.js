import express from "express"
import { addSchool, loginSchool,updateSchool,deleteSchool } from "../controllers/schoolController.js"

const router = express.Router()

router.post('/addSchool', addSchool)
router.get('/loginSchool', loginSchool)
router.post('/updateSchool', updateSchool)
router.delete('/deleteSchool/:schoolId', deleteSchool)


export default router