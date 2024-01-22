import asyncHandler from "express-async-handler";
import Emp from "../models/empModel.js";

// Function to validate if all required fields are present
const validateRequiredFields = (body, requiredFields) => {
    return requiredFields.every(field => body[field]);
};

// Create employee
const createEmp = asyncHandler(async (req, res) => {
    const requiredFields = [
        'school', 'empName', 'empEmail', 'empRelativeName', 'empGender', 'empDOB', 'empNumberOne', 'empWhatsappNumber', 'empCategory', 'empReligion', 'empBloodGrp', 'empAadharNumber', 'empId', 'empQualification', 'empProfile', 'empDepartment', 'empDesignation', 'empPanCardNumber', 'empPfNumber', 'empBankName', 'empBankAcNumber', 'empBankIfscCode', 'empBasicSalary', 'empAddress', 'empPinCode'
    ];

    if (!validateRequiredFields(req.body, requiredFields)) {
        return res.status(400).json({ error: "Please add all the required fields" });
    }

    try {
        const emp = await Emp.create(req.body);
        res.status(201).json(emp);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Employee creation failed' });
    }
});

// Update employee
const updateEmp = asyncHandler(async (req, res) => {
    const { empId } = req.params;
    try {
        const emp = await Emp.findOne({ empId });

        if (!emp) {
            return res.status(404).json({ error: "Employee not found" });
        }

        const fieldsToUpdate = [
            'empName', 'empEmail', 'empRelativeName', 'empGender', 'empDOB', 'empNumberOne', 'empNumberTwo', 'empWhatsappNumber', 'empCategory', 'empReligion', 'empBloodGrp', 'empAadharNumber', 'empId', 'empQualification', 'empSubjectPreffered', 'empProfile', 'empDepartment', 'empDesignation', 'empPanCardNumber', 'empPfNumber', 'empBankName', 'empBankAcNumber', 'empBankIfscCode', 'empBasicSalary', 'empHraAmount', 'empDaAmount', 'empAllowances', 'empOtherWages', 'empPfAmount', 'empTdsAmount', 'empEsicAmount', 'empProfessionalTax', 'empAddress', 'empVillage', 'empBlock', 'empDistrict', 'empState', 'empPinCode', 'empLandMark', 'empPhoto', 'empSign', 'empExperience', 'empQualificationPhoto', 'empIdProof', 'empPanCardPhoto', 'empAadharCardPhoto', 'empCV'
        ];

        fieldsToUpdate.forEach(field => {
            emp[field] = req.body[field] || emp[field];
        });

        const updatedEmp = await emp.save();
        res.status(200).json(updatedEmp);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Employee update failed' });
    }
});

// Read all employees
const readEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Emp.find({ school: req.body.school });
        res.status(200).json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

// Read single employee
const readSingleEmp = asyncHandler(async (req, res) => {
    try {
        const employee = await Emp.findOne({ empId: req.body.empId });
        if (employee) {
            res.status(200).json({ employee });
        } else {
            res.status(404).json({ error: "Employee not found" });
        }
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Error fetching employee' });
    }
});

// Delete single employee
const deleteEmp = asyncHandler(async (req, res) => {
    const { empId } = req.body;
    try {
        const toDeleteEmp = await Emp.findOne({ empId });

        if (toDeleteEmp) {
            await Emp.deleteOne({ empId });
            res.status(200).json({ toDeleteEmp });
        } else {
            res.status(404).json({ error: "Employee not found" });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

export { createEmp, updateEmp, readEmployees, readSingleEmp, deleteEmp };
