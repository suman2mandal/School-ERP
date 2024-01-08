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
<<<<<<< HEAD
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
=======
    schoolDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
>>>>>>> 7c87e4181b2d1b610b6f2d833c449c539ed4cbc9
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
