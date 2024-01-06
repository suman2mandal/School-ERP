import Attendance from '../models/attendanceModel.js';

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send({ attendance });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Retrieve Attendance
const retrieveAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).send();
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send();
    }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).send();
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send();
    }
};

export { markAttendance, retrieveAttendance, deleteAttendance}