import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Fees from '../models/feesModel.js';

const validateRequiredFields = (body, requiredFields) => {
    return requiredFields.every(field => body[field]);
};

const createStudent = asyncHandler(async (req, res) => {
    const today = new Date();

    const requiredFields = [
        'school', 'registerationNumber', 'registerationDate', 'studentClass', 'phoneNumber',
        'section', 'studentName', 'fatherName', 'motherName', 'gender',
        'alternatePhoneNumber', 'email', 'address', 'town',
        'district', 'state', 'pincode', 'landMark', 'rollNumber', 'aaadharNumber',
        'bloodGroup', 'category', 'religion'
    ];

    if (!validateRequiredFields(req.body, requiredFields)) {
        return res.status(400).json({ error: 'Please fill all the required fields' });
    }

    const gotDob = req.body['dob'];

    const { city, village } = req.body;
    if (!city || !village) {
        return res.status(400).json({ error: 'Please add city or village' });
    }

    const { studentClass, school } = req.body;
    const feesInfo = await Fees.findOne({ studentClass, school });
    const monthlyFees = feesInfo?.feesAmount || 0;
    const age = today.getFullYear() - new Date(gotDob).getFullYear();
    const studentData = { ...req.body, monthlyFees, age, deleted: false }; // Set deleted to false

    try {
        const student = await Student.create(studentData);
        const responseData = mapStudentData(student);
        return res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating student:', error);
        return res.status(500).json({ error: 'Student creation failed' });
    }
});

const updateStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.body;
    const student = await Student.findOne({ registerationNumber, deleted: false });

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const fieldsToUpdate = [
        'registerationNumber', 'registerationDate', 'studentClass', 'phoneNumber',
        'section', 'studentName', 'fatherName', 'motherName', 'gender', 'dob', 'age',
        'alternatePhoneNumber', 'email', 'address', 'town', 'city', 'district', 'state',
        'pincode', 'village', 'landMark', 'lastSchoolName', 'lastClass', 'lastClassScore',
        'lastClassYear', 'lastClassTC', 'lastClassReason', 'lastClassBoard', 'lastClassMedium', 'lastClassCity',
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
        'pincode', 'village', 'landMark', 'monthlyFees'
    ];

    return fieldsToInclude.reduce((data, field) => {
        data[field] = student[field];
        return data;
    }, {});
};

const readAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({ deleted: { $ne: true } });

    if (students.length > 0) {
        res.status(200).json({ students });
    } else {
        res.status(404).json({ error: "No students found" });
    }
});

const readAllClassStudents = asyncHandler(async (req, res) => {
    const { school, studentClass } = req.body;
    const students = await Student.find({ school, studentClass, deleted: { $ne: true } });

    if (students && students.length > 0) {
        res.status(200).json({ students });
    } else {
        res.status(404).json({ error: "No students found" });
    }
});
const readAllStudentsOfaSchool = asyncHandler(async (req, res) => {
    try {
        const { school } = req.body;
        const students = await Student.find({ school, deleted: { $ne: true } });

        if (students.length > 0) {
            res.status(200).json(students);
        } else {
            res.status(404).json({ error: "No students found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const readOneStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.body;
    const student = await Student.findOne({ registerationNumber, deleted: { $ne: true } });

    if (student) {
        res.status(200).json({ student });
    } else {
        res.status(404).json({ error: "No student found" });
    }
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { registerationNumber } = req.body;
    const studentToDelete = await Student.findOne({ registerationNumber });

    if (!studentToDelete) {
        return res.status(404).json({ error: "No student found" });
    }

    // Instead of physically removing the document, mark it as deleted
    studentToDelete.deleted = true;

    try {
        const updatedStudent = await studentToDelete.save();
        res.status(200).json({ studentToDelete: updatedStudent });
    } catch (error) {
        console.error('Error marking student as deleted:', error);
        res.status(500).json({ error: 'Failed to mark student as deleted' });
    }
});

export {
    createStudent,
    updateStudent,
    readAllStudentsOfaSchool,
    readOneStudent,
    deleteStudent,
    readAllStudents,
    readAllClassStudents
};
