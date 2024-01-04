import asyncHandler from 'express-async-handler';
import Fees from '../models/feesModel.js';

// Add fees component
const addFees = asyncHandler(async (req, res) => {
    const { studentClass, feesAmount } = req.body;

    if (!studentClass || !feesAmount) {
        res.status(400).json({ error: "Please add class and fees amount" });
        return;
    }

    const fees = await Fees.create({
        studentClass,
        feesAmount,
    });

    if (fees) {
        const { studentClass, feesAmount } = fees;
        res.status(201).json({ studentClass, feesAmount });
    } else {
        res.status(400).json({ error: "Fees not added" });
    }
});

// Update fees
const updateFees = asyncHandler(async (req, res) => {
    const { studentClass } = req.params;

    const fees = await Fees.findOne({ studentClass });

    if (!fees) {
        res.status(404).json({ error: "Fees not found" });
        return;
    }

    const { feesAmount } = req.body;

    fees.feesAmount = feesAmount || fees.feesAmount;

    const updatedFees = await fees.save();

    if (updatedFees) {
        res.status(201).json({ FeesAmount: updatedFees.feesAmount });
    } else {
        res.status(404).json({ error: "Fees not updated" });
    }
});

export { addFees, updateFees };
