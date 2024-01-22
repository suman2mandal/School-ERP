import asyncHandler from 'express-async-handler';
import Fees from '../models/feesModel.js';

// Add fees component
const addFees = asyncHandler(async (req, res) => {
    const { studentClass, feesAmount, school } = req.body;

    if (!studentClass || !feesAmount || !school) {
        return res.status(400).json({ error: "Please fill all required fields" });
    }

    const fees = await Fees.create({
        school,
        studentClass,
        feesAmount,
    });

    if (fees) {
        const { studentClass, feesAmount, school } = fees;
        return res.status(201).json({ studentClass, feesAmount, school });
    } else {
        return res.status(400).json({ error: "Fees not added" });
    }
});

// Update fees
const updateFees = asyncHandler(async (req, res) => {
    const { feesAmount, school, studentClass } = req.body;

    const fees = await Fees.findOne({ school, studentClass });

    if (!fees) {
        return res.status(404).json({ error: "Fees not found" });
    }

    fees.feesAmount = feesAmount || fees.feesAmount;

    const updatedFees = await fees.save();

    if (updatedFees) {
        return res.status(200).json({ feesAmount: updatedFees.feesAmount, studentClass: updatedFees.studentClass });
    } else {
        return res.status(400).json({ error: "Fees not updated" });
    }
});

// Read fees
const readFees = asyncHandler(async (req, res) => {
    const feesCredentials = await Fees.find({ school: req.body.school });

    if (feesCredentials.length > 0) {
        return res.status(200).json({ feesCredentials });
    } else {
        return res.status(404).json({ error: "No fees data found" });
    }
});

// Delete fees
const deleteFees = asyncHandler(async (req, res) => {
    const { school, studentClass } = req.body;
    const feesToDelete = await Fees.findOneAndDelete({ school, studentClass });

    if (feesToDelete) {
        return res.status(200).json({ feesToDelete });
    } else {
        return res.status(404).json({ error: "No fees found" });
    }
});

export { addFees, updateFees, readFees, deleteFees };
