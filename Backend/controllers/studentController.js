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

// Update the student

const updateStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.params

    const student = await Student.findOne({ registerationNumber: registerationNumber })

    if (student) {
        const { registerationNumber, registerationDate, studentClass, phoneNumber, section, studentName, fatherName, motherName, gender, dob, age, alternatePhoneNumber, email, address, town, city, district, state, pincode, village, landMark } = await req.body
        student.registerationNumber = registerationNumber || registerationNumber;
        student.registerationDate = registerationDate || registerationDate;
        student.studentClass = studentClass || studentClass;
        student.phoneNumber = phoneNumber || phoneNumber;
        student.section = section || section;
        student.studentName = studentName || studentName;
        student.fatherName = fatherName || fatherName;
        student.motherName = motherName || motherName;
        student.gender = gender || gender;
        student.dob = dob || dob;
        student.age = age || age;
        student.alternatePhoneNumber = alternatePhoneNumber || alternatePhoneNumber;
        student.email = email || email;
        student.address = address || address;
        student.town = town || town;
        student.city = city || city;
        student.district = district || district;
        student.state = state || state;
        student.pincode = pincode || pincode;
        student.village = village || village;
        student.landMark = landMark || landMark;

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

module.exports = {
    createStudent,
    updateStudent
}



