import express from "express"
import { readFees, receiveFees } from "../controllers/studentFeesController.js"
const router = express.Router()

router.post('/receivefees', receiveFees)

router.post('/readfees', readFees)

export default router