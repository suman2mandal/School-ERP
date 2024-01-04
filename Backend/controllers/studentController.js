const asyncHandler = require('express-async-handler')
const Student = require("../models/studentModel")
const Fees = require("../models/feesModel")

// Create student logic

const createStudent = asyncHandler(async (req, res) => {

    // Destructuring data from the request
    const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, district, state, pincode, village, landMark, schoolName } = await req.body

    // Validation in the backend
    if (!registerationNumber || !registerationDate || !studentClass || !phoneNumber || !section || !studentName || !fatherName || !motherName || !gender || !dob || !age || !alternatePhoneNumber || !email || !address || !town || !district || !state || !pincode || !landMark || !schoolName) {
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
            monthlyFees,
            schoolName
        })

        if (student) {

            const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, village, district, state, pincode, landMark, schoolName } = student

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
                monthlyFees,
                schoolName
            })

        }

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Student creation failed" });
    }

})

// Update the student

const updateStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.params

    const student = await Student.findOne({ registerationNumber: registerationNumber })

    if (student) {

        const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, district, state, pincode, village, landMark } = await req.body

        student.registerationNumber = req.body.registerationNumber || registerationNumber;
        student.registerationDate = req.body.registerationDate || registerationDate;
        student.studentClass = req.body.studentClass || studentClass;
        student.phoneNumber = req.body.phoneNumber || phoneNumber;
        student.section = req.body.section || section;
        student.studentName = req.body.studentName || studentName;
        student.fatherName = req.body.fatherName || fatherName;
        student.motherName = req.body.motherName || motherName;
        student.gender = req.body.gender || gender;
        student.dob = req.body.dob || dob;
        student.age = req.body.age || age;
        student.alternatePhoneNumber = req.body.alternatePhoneNumber || alternatePhoneNumber;
        student.email = req.body.email || email;
        student.address = req.body.address || address;
        student.town = req.body.town || town;
        student.city = req.body.city || city;
        student.district = req.body.district || district;
        student.state = req.body.state || state;
        student.pincode = req.body.pincode || pincode;
        student.village = req.body.village || village;
        student.landMark = req.body.landMark || landMark;


        const updatedStudent = await student.save()

        res.status(200).json({
            RegisterationNumber: updatedStudent.registerationNumber,
            RegisterationDate: updatedStudent.registerationDate,
            StudentClass: updatedStudent.studentClass,
            PhoneNumber: updatedStudent.phoneNumber,
            Section: updatedStudent.section,
            StudentName: updatedStudent.studentName,
            FatherName: updatedStudent.fatherName,
            MotherName: updatedStudent.motherName,
            Gender: updatedStudent.gender,
            DOB: updatedStudent.dob,
            Age: updatedStudent.age,
            AlternatePhoneNumber: updatedStudent.alternatePhoneNumber,
            Email: updatedStudent.email,
            Address: updatedStudent.address,
            Town: updatedStudent.town,
            City: updatedStudent.city,
            District: updatedStudent.district,
            State: updatedStudent.state,
            Pincode: updatedStudent.pincode,
            Village: updatedStudent.village,
            LandMark: updatedStudent.landMark,
        })

    }
    else {
        res.status(404)
        throw new Error("Student not found")
    }
})

// Get all students


module.exports = {
    createStudent,
    updateStudent
}



