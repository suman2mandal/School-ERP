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
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
