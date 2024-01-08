import express from 'express';
const router = express.Router();
import {markAttendance, retrieveAttendance, deleteAttendance} from '../controllers/attendanceController.js';

router.post('/attendance', markAttendance);
router.get('/attendance/:id', retrieveAttendance);
router.delete('/attendance/:id', deleteAttendance);

export default router;
