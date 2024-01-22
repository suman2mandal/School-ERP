import mongoose from 'mongoose';

// Defining the student schema based on the FormValues interface
const studentSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    registerationNumber: {
        type: String,
        required: [true, "Please add a registration number"],
        unique: true,
    },
    registerationDate: {
        type: Date,
        required: [true, "Please add a registration date"],
    },
    studentClass: {
        type: Number,
        require: [true, "Please add a class"],
    },
    age: {
        type: Number,
    },
    village: {
        type: String,
    },
    image: {
        type: String,
        required: [false],
        default: "https://png.pngtree.com/png-clipart/20220615/original/pngtree-kid-student-back-to-school-in-uniform-wear-backpack-png-image_8043401.png",
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    section: {
        type: String,
        required: [true, "Please add a section"],
    },
    studentName: {
        type: String,
        required: [true, "Please add student name"],
    },
    fatherName: {
        type: String,
        required: [true, "Please add father name"],
    },
    motherName: {
        type: String,
        required: [true, "Please add mother name"],
    },
    gender: {
        type: String,
        required: [true, "Please add gender of the student"],
    },
    dob: {
        type: Date,
        required: [true, "Please add date of birth"],
    },
    alternatePhoneNumber: {
        type: String,
        required: [false],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    monthlyFees: {
        type: Number,
        required: true,
        ref: "Fees",
    },
    address: {
        type: String,
        required: [true, "Please add an address of the student"],
    },
    town: {
        type: String,
        required: [true, "Please add a town of the student"],
    },
    city: {
        type: String,
    },
    district: {
        type: String,
        required: [true, "Please add a district of the student"],
    },
    state: {
        type: String,
        required: [true, "Please add a state of the student"],
    },
    pincode: {
        type: String,
        required: [true, "Please add the pincode"],
    },
    landMark: {
        type: String,
        required: [true, "Please add the landmark"],
    },
    rollNumber: {
        type: Number,
        required: [true, "Please add the roll number"],
    },
    aaadharNumber: {
        type: String,
        required: [true, "Please add the aadhar number"],
    },
    bloodGroup: {
        type: String,
        required: [true, "Please add the blood group"],
    },
    category: {
        type: String,
        required: [true, "Please add the category"],
    },
    religion: {
        type: String,
        required: [true, "Please add the religion"],
    },
    lastSchoolName: {
        type: String,
        default: 'n/a'
    },
    lastClass: {
        type: String,
        default: 'n/a'
    },
    lastClassScore: {
        type: String,
        default: 'n/a'
    },
    lastClassYear: {
        type: String,
        default: 'n/a'
    },
    lastClassTC: {
        type: String,
        default: 'n/a'
    },
    lastClassReason: {
        type: String,
        default: 'n/a'
    },
    lastClassBoard: {
        type: String,
        default: 'n/a'
    },
    lastClassMedium: {
        type: String,
        default: 'n/a'
    },
    lastClassCity: {
        type: String,
        default: 'n/a'
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

