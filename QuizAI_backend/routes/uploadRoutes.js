import express from 'express';
import { uploadFiles } from '../controllers/fileController.js';

const router = express.Router();

router.post('/:email/:name', uploadFiles);

export default router;