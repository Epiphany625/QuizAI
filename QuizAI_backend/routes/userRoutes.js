import express from 'express';
import { getUser, addSummaryRequested } from '../controllers/userController.js';

const router = express.Router();

router.get('/:email', getUser);
router.patch('/:email/summary', addSummaryRequested);
// router.patch('/:email/quiz', addQuizGenerated);
export default router;