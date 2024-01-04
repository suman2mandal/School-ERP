//Importing mongoose and other dependencies that are needed
const mongoose = require('mongoose') //For operations in mongodb


//Defining the student schema
const studentSchema = mongoose.Schema({
    registerationNumber: {
        type: String,
        required: [true, "Please add a registeration number"],
        unique: true
    },
    registerationDate: {
        type: Date,
        required: [true, "Please add a registeration date"],

    },
    studentClass: {
        type: Number,
        require: [true, "Please add a class"],
    },
    image: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png"
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    section: {
        type: String,
        required: [true, "Please add a section"]
    },
    studentName: {
        type: String,
        required: [true, "Please add student name"]
    },
    fatherName: {
        type: String,
        required: [true, "Please add father name"]
    },
    motherName: {
        type: String,
        required: [true, "Please add mother name"]
    },
    gender: {
        type: String,
        required: [true, "Please add gender of the student"]
    },
    dob: {
        type: Date,
        required: [true, "Please add date of birth"]
    },
    age: {
        type: Number,
        required: [true, "Please add age of the student"]
    },
    alternatePhoneNumber: {
        type: String,
        required: [false]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    // According to classwise and operator will select a class and fees will be automatically stored for the student
    monthlyFees: {
        type: Number,
        required: true,
        ref: "Fees"
    },
    address: {
        type: String,
        required: [true, "Please add address of the student"],

    },
    town: {
        type: String,
        required: [true, "Please add town of the student"]
    },
    city: {
        type: String,

    },
    village: {
        type: String,

    },
    district: {
        type: String,
        required: [true, "Please add district of the student"]
    },
    state: {
        type: String,
        required: [true, "Please add state of the student"]
    },
    pincode: {
        type: String,
        required: [true, "Please add the pincode"]
    },
    landMark: {
        type: String,
        required: [true, "Please add the landmark"]
    },
    schoolName: {
        type: String,
        required: [true, "Please add a schoolname"]
    }
},
)


//Storing the student into a variable
const Student = mongoose.model("Student", studentSchema)

//Exporting the student schema, so that we can use it in different files
module.exports = Student
