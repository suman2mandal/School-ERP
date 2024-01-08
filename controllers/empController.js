import asyncHandler from "express-async-handler"
import Emp from "../models/empModel.js"

const validateRequiredFields = (body, requiredFields) => {
    return requiredFields.every(field => body[field]);
};



// Create employee
const createEmp = asyncHandler(async (req, res) => {

    const { school, empName, empEmail, empRelativeName, empGender, empDOB, empNumberOne, empNumberTwo, empWhatsappNumber, empCategory, empReligion, empBloodGrp, empAadharNumber, empId, empQualification, empSubjectPreffered, empProfile, empDepartment, empDesignation, empPanCardNumber, empPfNumber, empBankName, empBankAcNumber, empBankIfscCode, empBasicSalary, empHraAmount, empDaAmount, empAllowances, empOtherWages, empPfAmount, empTdsAmount, empEsicAmount, empProfessionalTax, empAddress, empVillage, empBlock, empDistrict, empState, empPinCode, empLandMark, empPhoto, empSign, empExperience, empQualificationPhoto, empIdProof, empPanCardPhoto, empAadharCardPhoto, empCV } = req.body

    const requiredFields = [
        'school', 'empName', 'empEmail', 'empRelativeName', 'empGender', 'empDOB', 'empNumberOne', 'empWhatsappNumber', 'empCategory', 'empReligion', 'empBloodGrp', 'empAadharNumber', 'empId', 'empQualification', 'empProfile', 'empDepartment', 'empDesignation', 'empPanCardNumber', 'empPfNumber', 'empBankName', 'empBankAcNumber', 'empBankIfscCode', 'empBasicSalary', 'empAddress', 'empPinCode'
    ]


    if (!validateRequiredFields(req.body, requiredFields)) {
        res.status(400).json({ error: "Please add all the required fields" })
    }


    const empData = { ...req.body }

    try {
        const emp = await Emp.create(empData)

        res.status(201).json(emp)
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Employee creation failed' })
    }


})

// Update Teacher

const updateEmp = asyncHandler(async (req, res) => {
    const { empId } = req.params;
    const emp = await Emp.findOne({ empId });
    if (!emp) {
        res.status(404).json({ error: "Employee not found" })
        return;
    }

    const fieldsToUpdate = [
        'empName', 'empEmail', 'empRelativeName', 'empGender', 'empDOB', 'empNumberOne', 'empNumberTwo', 'empWhatsappNumber', 'empCategory', 'empReligion', 'empBloodGrp', 'empAadharNumber', 'empId', 'empQualification', 'empSubjectPreffered', 'empProfile', 'empDepartment', 'empDesignation', 'empPanCardNumber', 'empPfNumber', 'empBankName', 'empBankAcNumber', 'empBankIfscCode', 'empBasicSalary', 'empHraAmount', 'empDaAmount', 'empAllowances', 'empOtherWages', 'empPfAmount', 'empTdsAmount', 'empEsicAmount', 'empProfessionalTax', 'empAddress', 'empVillage', 'empBlock', 'empDistrict', 'empState', 'empPinCode', 'empLandMark', 'empPhoto', 'empSign', 'empExperience', 'empQualificationPhoto', 'empIdProof', 'empPanCardPhoto', 'empAadharCardPhoto', 'empCV'
    ];

    fieldsToUpdate.forEach(field => {
        emp[field] = req.body[field] || emp[field];
    })

    const updatedEmp = await emp.save();
    res.status(200).json(updatedEmp)

})

// Read all employees
const readEmployees = asyncHandler(async (req, res) => {
    const employees = await Emp.find({ school: req.body.school })
    if (employees) {
        res.status(200).json({ employees })
    }
    else {
        res.status(404).json({ error: "No employees found" })
    }
})

// Read single employee
const readSingleEmp = asyncHandler(async (req, res) => {
    const employee = await Emp.find({ empId: req.body.empId })
    if (employee) {
        res.status(200).json({ employee })
    }
    else {
        res.status(404).json({ error: "Employee not found" })
    }
})

// Delete single employee 

const deleteEmp = asyncHandler(async (req, res) => {
    const { empId } = await req.body
    const toDeleteEmp = await Emp.find({ empId })
    if (toDeleteEmp) {
        await Emp.deleteOne({ empId })
        res.status(200).json({ toDeleteEmp })
    }
    else {
        res.status(404).json({ error: "Employee not found" })
    }
})


export { createEmp, updateEmp, readEmployees, readSingleEmp, deleteEmp }
