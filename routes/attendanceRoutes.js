import express from 'express';
const router = express.Router();
import {markAttendance, retrieveAttendance, deleteAttendance} from '../controllers/attendanceController.js';

router.post('/', markAttendance);
router.get('/GetAttendance/:id', retrieveAttendance);
router.delete('/DeleteAttendance/:id', deleteAttendance);

export default router;
