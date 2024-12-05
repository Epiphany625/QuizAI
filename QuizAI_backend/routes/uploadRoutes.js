import express from 'express';
import { uploadFiles, getFiles } from '../controllers/fileController.js';

const router = express.Router();

router.post('/:email/:name', uploadFiles);
router.get('/:email/:name', getFiles);
export default router;