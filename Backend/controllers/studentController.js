import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Fees from '../models/feesModel.js';

const validateRequiredFields = (body, requiredFields) => {
    return requiredFields.every(field => body[field]);
};

const createStudent = asyncHandler(async (req, res) => {
    const requiredFields = [
        'registerationNumber', 'registerationDate', 'studentClass', 'phoneNumber',
        'section', 'studentName', 'fatherName', 'motherName', 'gender', 'dob', 'age',
        'alternatePhoneNumber', 'email', 'address', 'town', 'district', 'state',
        'pincode', 'landMark', 'schoolName',
    ];

    if (!validateRequiredFields(req.body, requiredFields)) {
        res.status(400).json({ error: 'Please fill all the required fields' });
        return;
    }

    const { city, village } = req.body;
    if (!city && !village) {
        res.status(400).json({ error: 'Please add city or village' });
        return;
    }

    const { studentClass } = req.body;
    const feesInfo = await Fees.findOne({ studentClass });
    const monthlyFees = feesInfo?.feesAmount || 0;

    const studentData = { ...req.body, monthlyFees };

    try {
        const student = await Student.create(studentData);
        const responseData = mapStudentData(student);
        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Student creation failed' });
    }
});

const updateStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.params;
    console.log(registerationNumber)
    const student = await Student.findOne({ registerationNumber });

    if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
    }

    const fieldsToUpdate = [
        'registerationNumber', 'registerationDate', 'studentClass', 'phoneNumber',
        'section', 'studentName', 'fatherName', 'motherName', 'gender', 'dob', 'age',
        'alternatePhoneNumber', 'email', 'address', 'town', 'city', 'district', 'state',
        'pincode', 'village', 'landMark',
    ];

    fieldsToUpdate.forEach(field => {
        student[field] = req.body[field] || student[field];
    });

    const { studentClass } = req.body;
    const feesInfo = await Fees.findOne({ studentClass });
    student.monthlyFees = feesInfo?.feesAmount || 0;

    const updatedStudent = await student.save();
    const responseData = mapStudentData(updatedStudent);
    res.status(200).json(responseData);
});

const mapStudentData = (student) => {
    const fieldsToInclude = [
        'registerationNumber', 'registerationDate', 'studentClass', 'phoneNumber',
        'section', 'studentName', 'fatherName', 'motherName', 'gender', 'dob', 'age',
        'alternatePhoneNumber', 'email', 'address', 'town', 'city', 'district', 'state',
        'pincode', 'village', 'landMark', 'monthlyFees', 'schoolName',
    ];

    return fieldsToInclude.reduce((data, field) => {
        data[field] = student[field];
        return data;
    }, {});
};

export { createStudent, updateStudent };
