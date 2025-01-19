import express from 'express';
import { parseMaterials } from '../controllers/fileController.js';

const router = express.Router();
router.post('/parseMaterials', parseMaterials);

export default router;