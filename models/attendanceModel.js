import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    attendanceStatus: {
        type: String,
        required: true
    },
    studentDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    staffDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emp'
    },
    schoolDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

AttendanceSchema.pre('save', function (next) {
    // Update the 'updatedAt' field before saving the document
    this.updatedAt = new Date();
    next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
