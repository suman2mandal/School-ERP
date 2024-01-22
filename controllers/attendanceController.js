import Attendance from '../models/attendanceModel.js';

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const attendance = new Attendance({
            ...req.body,
            createdAt: new Date(), // Set the createdAt timestamp
            updatedAt: new Date()  // Set the updatedAt timestamp
        });
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
            return res.status(404).send(`No data found related to ${req.params.id}`);
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send(`Error in retrieving attendance with ID: ${req.params.id}`);
    }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).send(`Attendance record with ID ${req.params.id} not found`);
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send(`Error in deleting attendance with ID: ${req.params.id}`);
    }
};

export { markAttendance, retrieveAttendance, deleteAttendance };
