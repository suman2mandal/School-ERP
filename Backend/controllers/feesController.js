const asyncHandler = require('express-async-handler')
const Fees = require("../models/feesModel")
// Add fees component
const addFees = asyncHandler(async (req, res) => {
    const { studentClass, feesAmount } = await req.body

    if (!studentClass || !feesAmount) {
        res.status(400)
        throw new Error("Please add class and fees amount")
    }

    const fees = await Fees.create({
        studentClass,
        feesAmount
    })

    if (fees) {
        const { studentClass, feesAmount } = fees
        res.status(201).json({
            studentClass, feesAmount
        })
    }
    else {
        res.status(400).json({ error: "Fees not added" })
    }

})

// Update fees

const updateFees = asyncHandler(async (req, res) => {
    const { studentClass } = req.params

    const fees = await Fees.findOne({ studentClass: studentClass })

    if (fees) {
        const { feesAmount } = await req.body

        fees.feesAmount = req.body.feesAmount || feesAmount

        const updatedFees = await fees.save()

        if (updateFees) {
            res.status(201).json({
                FeesAmount: updatedFees.feesAmount
            })
        }
        else {
            res.status(404)
            throw new Error("Fees not updated")
        }

    }
    else {
        res.status(404)
        throw new Error("Fees not found")
    }

})

module.exports = {
    addFees,
    updateFees
}