import express from 'express';
import { postQuiz } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', postQuiz);

export default router;