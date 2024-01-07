import mongoose from "mongoose"

const studentFeesSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    registerationNumber: {
        type: String,
        required: [true, "Please add registeration number of the student"]
    },
    studentName: {
        type: String,
        required: [true, "Please enter the student name"]
    },
    fatherName: {
        type: String,
        required: [true, "Please add father name of the student"]
    },
    studentClass: {
        type: Number,
        required: [true, "Please enter the class of student"]
    },
    studentSection: {
        type: Number,
        required: [true, "Please enter the section of the student"]
    },
    otherFeesOne: {
        type: Number,
        required: false
    },
    otherFeesTwo: {
        type: Number,
        required: false
    },
    otherFeesThree: {
        type: Number,
        required: false
    },
    otherFeesFour: {
        type: Number,
        required: false
    },
    amountToPay: {
        type: Number,
        required: false
    },
    amountPaid: {
        type: Number,
        required: [true, "Please add how much amount paid"]
    },
    balanceAmount: {
        type: Number,
        required: false
    },
    submitDate: {
        type: Date,
        required: [true, "Please add date of submission"]
    },
    payMode: {
        type: String,
        required: [true, "Please add payment mode"]
    }


})

const StudentFees = mongoose.Model("StudentFees", studentFeesSchema)
module.exports = StudentFees