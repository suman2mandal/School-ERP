import mongoose from "mongoose";

const empSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    empName: {
        type: String,
        required: [true, "Please add employee name"]
    },
    empEmail: {
        type: String,
        required: [true, "Please add a email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    empRelativeName: {
        type: String,
        required: [true, "Please add father's or husband's name"]
    },
    empGender: {
        type: String,
        required: [true, "Please add gender of the employee"],

    },
    empDOB: {
        type: Date,
        required: [true, "Please add DOB of employee"]
    },
    empNumberOne: {
        type: String,
        required: [true, "Please add phone number of the employee"]
    },
    empNumberTwo: {
        type: String,
        default: null
    },
    empWhatsappNumber: {
        type: String,
        required: [true, 'Please add whatsapp number of the employee']
    },
    empCategory: {
        type: String,
        required: [true, "Please add category of employee"]
    },
    empReligion: {
        type: String,
        required: [true, "Please add religion of the employee"]
    },
    empBloodGrp: {
        type: String,
        required: [true, "Please add the blood group of the employee"]
    },
    empAadharNumber: {
        type: String,
        required: [true, "Please add addhar card number of the employee"]
    },
    empId: {
        type: String,
        required: [true, "Please add an employee id"],
        unique: true
    },
    empQualification: {
        type: String,
        required: [true, "Please add qualification of the employee"]
    },
    empClassPreffered: {
        type: String,
        default: null
    },
    empSubjectPreffered: {
        type: String,
        default: null
    },
    empProfile: {
        type: String,
        required: [true, "Please add teaching or non-teaching"]
    },
    empDepartment: {
        type: String,
        required: [true, "Please add department of the employee"]
    },
    empDesignation: {
        type: String,
        required: [true, "Please add designation of the employee"]
    },
    empPanCardNumber: {
        type: String,
        required: [true, "Please add pan card of the employee"]
    },
    empPfNumber: {
        type: String,
        required: [true, "Please add PF number of the employee"]
    },
    empBankName: {
        type: String,
        required: [true, "Please add bank name of the employee"]
    },
    empBankAcNumber: {
        type: String,
        required: [true, "Please add bank account number of the employee"]
    },
    empBankIfscCode: {
        type: String,
        required: [true, "Please add IFSC code of the emp bank account"]
    },
    empBasicSalary: {
        type: Number,
        required: [true, "Please add monthly salary of the employee"]
    },
    empHraAmount: {
        type: Number,
        default: 0
    },
    empDaAmount: {
        type: Number,
        default: 0
    },
    empAllowances: {
        type: Number,
        default: 0
    },
    empOtherWages: {
        type: Number,
        default: 0
    },
    empPfAmount: {
        type: Number,
        default: 0
    },
    empTdsAmount: {
        type: Number,
        default: 0
    },
    empEsicAmount: {
        type: Number,
        default: 0
    },
    empProfessionalTax: {
        type: Number,
        default: 0
    },
    empAddress: {
        type: String,
        required: [true, "Please add address of the employee"]
    },
    empVillage: {
        type: String,
        default: null
    },
    empBlock: {
        type: String,
        default: null
    },
    empDistrict: {
        type: String,
        default: null
    },
    empState: {
        type: String,
        default: null
    },
    empPinCode: {
        type: String,
        required: [true, "Please add pincode of state of employee"]
    },
    empLandMark: {
        type: String,
        default: null
    },
    empPhoto: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empSign: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empExperience: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empQualificationPhoto: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empIdProof: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empPanCardPhoto: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empAadharCardPhoto: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    empCV: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },

});

const Emp = mongoose.model("Emp", empSchema);

export default Emp;

