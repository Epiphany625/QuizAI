import express from 'express';
import { getCourses, addCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post('/addcourse/:email', addCourse);
router.get('/getCourses/:email', getCourses);

export default router;