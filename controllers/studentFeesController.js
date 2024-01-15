import asyncHandler from 'express-async-handler'
import { StudentFees } from "../models/studentFeesModel.js"
import Student from "../models/studentModel.js"

const getTotalBalance = async (registrationNumber) => {
    try {
        // Check if registration number is provided
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

            // Add balance amount from the current record to the total balance for the current student
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


const receiveFees = asyncHandler(async (req, res) => {


    const { registerationNumber, otherFeesOne, otherFeesTwo, otherFeesThree, otherFeesFour, amountPaid, submitDate, payMode } = await req.body;

    const leftFull = await getTotalBalance(registerationNumber);
    const Total_Balance = leftFull[0]?.Total_Balance || 0;
    const parsedFeesOne = parseInt(otherFeesOne)
    const parsedFeesTwo = parseInt(otherFeesTwo)
    const parsedFeesThree = parseInt(otherFeesThree)
    const parsedFeesFour = parseInt(otherFeesFour)

    const student = await Student.findOne({ registerationNumber });

    if (!student) {
        return res.status(404).json({ error: "No student found with this registeration number" });
    }

    const { school, studentName, fatherName, studentClass, section, monthlyFees } = await student || {};

    const amountToPay = monthlyFees + parsedFeesOne + parsedFeesTwo + parsedFeesThree + parsedFeesFour + Total_Balance;
    console.log(monthlyFees, parsedFeesOne, parsedFeesTwo, parsedFeesThree, parsedFeesFour, Total_Balance)

    const date = new Date(submitDate);
    const balanceAmount = amountToPay - amountPaid;


    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const feesData = {
        ...req.body,
        studentName,
        fatherName,
        studentClass,
        section,
        amountToPay,
        balanceAmount,
        month,
        year
    };

    try {
        const fees = await StudentFees.create(feesData);

        if (fees) {
            return res.status(200).json({
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
            });
        } else {
            return res.status(400).json({ error: "Sorry fees not received! Try again" });
        }
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Read fees

const readFees = asyncHandler(async (req, res) => {

    // Question -- How can i show all left balance?  Like a student jan balance and feb balance is left , then it should be calculated and shown. 

    const { studentClass, school, month, year } = await req.body
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


    res.status(200).json(extractedData)

});




export { receiveFees, readFees, getTotalBalance }