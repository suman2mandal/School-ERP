import asyncHandler from 'express-async-handler';
import Fees from '../models/feesModel.js';

// Add fees component
const addFees = asyncHandler(async (req, res) => {
    const { studentClass, feesAmount, school } = req.body;

    if (!studentClass || !feesAmount || !school) {
        res.status(400).json({ error: "Please fill all required fields" });
        return;
    }

    const fees = await Fees.create({
        school,
        studentClass,
        feesAmount,
    });

    if (fees) {
        const { studentClass, feesAmount, school } = fees;
        res.status(201).json({ studentClass, feesAmount, school });
    } else {
        res.status(400).json({ error: "Fees not added" });
    }
});

// Update fees
const updateFees = asyncHandler(async (req, res) => {

    const { feesAmount, school, studentClass } = req.body

    const fees = await Fees.findOne({ school, studentClass });

    if (!fees) {
        res.status(404).json({ error: "Fees not found" });
        return;
    }


    fees.feesAmount = feesAmount || fees.feesAmount;


    const updatedFees = await fees.save();

    if (updatedFees) {
        res.status(201).json({ FeesAmount: updatedFees.feesAmount, StudentClass: updateFees.studentClass });
    } else {
        res.status(404).json({ error: "Fees not updated" });
    }
});

// Read fees
const readFees = asyncHandler(async (req, res) => {
    const feesCredentials = await Fees.find({ school: req.body.school })
    if (feesCredentials) {
        res.status("200").json({
            feesCredentials
        })
    }
    else {
        res.status("400").json({ error: "No fees data found" })
    }
})

// Delete fees
const deleteFees = asyncHandler(async (req, res) => {
    const { school, studentClass } = req.body
    const feesToDelete = await Fees.findOne({ school, studentClass });
    if (feesToDelete) {
        await feesToDelete.deleteOne()
        res.status("201").json({ feesToDelete })
    }
    else {
        res.status("404").json({ error: "No fees found" })
    }
})

export { addFees, updateFees, readFees, deleteFees };
