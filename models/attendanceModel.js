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
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
