import express from 'express';
import { postSummary } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/', postSummary);

export default router;