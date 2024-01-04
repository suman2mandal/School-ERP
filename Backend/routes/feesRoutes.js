const express = require("express")
const { addFees, updateFees } = require("../controllers/feesController")
const router = express.Router()

// Add fees
router.post('/addfees', addFees)

// Update fees
router.post('/updatefees/:studentClass', updateFees)

module.exports = router