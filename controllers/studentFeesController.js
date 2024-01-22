import asyncHandler from 'express-async-handler';
import { StudentFees } from "../models/studentFeesModel.js";
import Student from "../models/studentModel.js";

// Function to get total balance for a student
const getTotalBalance = async (registrationNumber) => {
    try {
        if (!registrationNumber) {
            throw new Error('Registration number is required');
        }

        const allStudentFees = await StudentFees.find({ registerationNumber: registrationNumber });

        const studentBalances = {};

        allStudentFees.forEach(student => {
            const studentId = student.registerationNumber;

            if (!studentBalances[studentId]) {
                studentBalances[studentId] = {
                    studentName: student.studentName,
                    fatherName: student.fatherName,
                    studentClass: student.studentClass,
                    registerationNumber: student.registerationNumber,
                    totalBalance: 0
                };
            }

            studentBalances[studentId].totalBalance += student.balanceAmount;
        });

        const extractedData = Object.values(studentBalances).map(student => ({
            Student_Name: student.studentName,
            Father_Name: student.fatherName,
            Student_Class: student.studentClass,
            Registeration_Number: student.registerationNumber,
            Total_Balance: student.totalBalance
        }));

        return extractedData;
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

// Function to create fees data
const createFeesData = async (student, feesBody, totalBalance) => {
    const { school, registerationNumber, otherFeesOne, otherFeesTwo, otherFeesThree, otherFeesFour, amountPaid, submitDate, payMode } = feesBody;

    const parsedFeesOne = parseInt(otherFeesOne);
    const parsedFeesTwo = parseInt(otherFeesTwo);
    const parsedFeesThree = parseInt(otherFeesThree);
    const parsedFeesFour = parseInt(otherFeesFour);

    const { studentName, fatherName, studentClass, section, monthlyFees } = student || {};

    const amountToPay = monthlyFees + parsedFeesOne + parsedFeesTwo + parsedFeesThree + parsedFeesFour + totalBalance;

    const date = new Date(submitDate);
    const balanceAmount = amountToPay - amountPaid;

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const feesData = {
        school: school,  // Add this line to include the school field
        registerationNumber,
        studentName,
        fatherName,
        studentClass,
        section,
        otherFeesOne,
        otherFeesTwo,
        otherFeesThree,
        otherFeesFour,
        amountToPay,
        balanceAmount,
        submitDate,
        payMode,
        month,
        year
    };

    try {
        const fees = await StudentFees.create(feesData);

        if (fees) {
            return {
                school,
                studentName,
                fatherName,
                studentClass,
                section,
                otherFeesOne,
                otherFeesTwo,
                otherFeesThree,
                otherFeesFour,
                submitDate,
                payMode,
                amountToPay,
                amountPaid,
                balanceAmount,
                month,
                year
            };
        } else {
            throw new Error('Sorry, fees not received! Try again');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

// Express route to receive fees
const receiveFees = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.body;

    try {
        const totalBalanceData = await getTotalBalance(registerationNumber);
        const totalBalance = totalBalanceData[0]?.Total_Balance || 0;

        const student = await Student.findOne({ registerationNumber });

        if (!student) {
            return res.status(404).json({ error: "No student found with this registration number" });
        }

        const feesData = await createFeesData(student, req.body, totalBalance);

        return res.status(200).json(feesData);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Express route to read fees
const readFees = asyncHandler(async (req, res) => {
    const { studentClass, school, month, year } = req.body;

    try {
        const studentsWhoPaid = await StudentFees.find({
            studentClass: studentClass,
            school: school,
            month: month,
            year: year
        });

        const extractedData = studentsWhoPaid.map(student => ({
            Student_Name: student.studentName,
            Father_Name: student.fatherName,
            Student_Class: student.studentClass,
            Registeration_Number: student.registerationNumber,
            Other_Fees_One: student.otherFeesOne,
            Other_Fees_Two: student.otherFeesTwo,
            Other_Fees_Three: student.otherFeesThree,
            Other_Fees_Four: student.otherFeesFour,
            Amount_To_Pay: student.amountToPay,
            Amount_Paid: student.amountPaid,
            Balance_Amount: student.balanceAmount,
            Submit_Date: student.submitDate,
            Pay_Mode: student.payMode,
            Month: student.month,
            Year: student.year
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const updateFees = asyncHandler(async (req, res) => {
    const feesId = req.params.id; // Assuming the fees record ID is provided in the URL params

    try {
        const fees = await StudentFees.findById(feesId);

        if (!fees) {
            return res.status(404).json({ error: "Fees record not found" });
        }

        // Update the fees record based on req.body
        // ...

        const updatedFees = await fees.save();

        return res.status(200).json(updatedFees);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to delete fees record
const deleteFees = asyncHandler(async (req, res) => {
    const feesId = req.params.id; // Assuming the fees record ID is provided in the URL params

    try {
        const fees = await StudentFees.findById(feesId);

        if (!fees) {
            return res.status(404).json({ error: "Fees record not found" });
        }

        await fees.remove();

        return res.status(200).json({ message: "Fees record deleted successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to get all students with their current balances
const getAllStudentBalances = asyncHandler(async (req, res) => {
    try {
        const allStudents = await Student.find({}, 'studentName fatherName studentClass registerationNumber');

        const studentBalances = {};

        for (const student of allStudents) {
            const totalBalanceData = await getTotalBalance(student.registerationNumber);
            const totalBalance = totalBalanceData[0]?.Total_Balance || 0;

            studentBalances[student.registerationNumber] = {
                studentName: student.studentName,
                fatherName: student.fatherName,
                studentClass: student.studentClass,
                registerationNumber: student.registerationNumber,
                totalBalance: totalBalance
            };
        }

        const extractedData = Object.values(studentBalances).map(student => ({
            Student_Name: student.studentName,
            Father_Name: student.fatherName,
            Student_Class: student.studentClass,
            Registeration_Number: student.registerationNumber,
            Total_Balance: student.totalBalance
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Export routes
export { receiveFees, readFees, getTotalBalance, updateFees, deleteFees, getAllStudentBalances };
