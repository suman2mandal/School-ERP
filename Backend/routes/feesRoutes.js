const express = require("express")
const { addFees } = require("../controllers/feesController")
const router = express.Router()

// Add fees
router.post('/addfees', addFees)

module.exports = router