import express from 'express';
import { parseFile } from '../controllers/fileController.js';

const router = express.Router();

router.get('/parseFile/:email/', parseFile);

export default router;