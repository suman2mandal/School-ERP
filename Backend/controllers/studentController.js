const asyncHandler = require('express-async-handler')
const Student = require("../models/studentModel")
const Fees = require("../models/feesModel")

// Create student logic

const createStudent = asyncHandler(async (req, res) => {

    // Destructuring data from the request
    const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, district, state, pincode, village, landMark } = await req.body

    // Validation in the backend
    if (!registerationNumber || !registerationDate || !studentClass || !phoneNumber || !section || !studentName || !fatherName || !motherName || !gender || !dob || !age || !alternatePhoneNumber || !email || !address || !town || !district || !state || !pincode || !landMark) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    if (!city && !village) {
        res.status(400)
        throw new Error("Please add city or village")
    }

    // Getting fees and populating it
    try {
        const feesInfo = await Fees.findOne({ studentClass: studentClass });

        if (feesInfo && feesInfo.feesAmount) {
            const { feesAmount } = feesInfo
            var monthlyFees = feesAmount
        }

        const student = await Student.create({
            registerationNumber,
            registerationDate,
            studentClass,
            phoneNumber,
            section,
            studentName,
            fatherName,
            motherName,
            gender,
            dob,
            age,
            alternatePhoneNumber,
            email,
            address,
            town,
            city,
            village,
            district,
            state,
            pincode,
            landMark,
            monthlyFees
        })

        if (student) {

            const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, village, district, state, pincode, landMark } = student

            res.status(201).json({
                registerationNumber,
                registerationDate,
                studentClass,
                phoneNumber,
                section,
                studentName,
                fatherName,
                motherName,
                gender,
                dob,
                age,
                alternatePhoneNumber,
                email,
                address,
                town,
                city,
                village,
                district,
                state,
                pincode,
                landMark,
                monthlyFees
            })

        }

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Student creation failed" });
    }

})

module.exports = {
    createStudent
}



