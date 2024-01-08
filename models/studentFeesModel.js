import mongoose from "mongoose"

const studentFeesSchema = mongoose.Schema({
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
    section: {
        type: String,
        required: [true, "Please enter the section of the student"]
    },
    otherFeesOne: {
        type: Number,
        required: false,
        default: 0
    },
    otherFeesTwo: {
        type: Number,
        required: false,
        default: 0
    },
    otherFeesThree: {
        type: Number,
        required: false,
        default: 0
    },
    otherFeesFour: {
        type: Number,
        required: false,
        default: 0
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
    },
    month: {
        type: Number,
        required: [true, "Please add month for which fees is received"]
    },
    year: {
        type: Number,
        required: [true, "Please add year for which fees is received"]
    }

})

const StudentFees = mongoose.model("StudentFees", studentFeesSchema)
export { StudentFees }