import express from "express"
import { getTotalBalance, readFees, receiveFees } from "../controllers/studentFeesController.js"
const router = express.Router()

router.post('/receivefees', receiveFees)

router.post('/readfees', readFees)

router.post('/allbalance', getTotalBalance)

export default router