import express from 'express';
import { getCourses, addCourse, changeCourseName, changeCourseDescription } from '../controllers/courseController.js';

const router = express.Router();

router.post('/addcourse/:email', addCourse);
router.get('/getCourses/:email', getCourses);
router.put('/changeCourseName/:email', changeCourseName);
router.put('/changeCourseDescription/:email', changeCourseDescription);

export default router;