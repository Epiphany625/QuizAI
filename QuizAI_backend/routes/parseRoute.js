import express from 'express';
import { postParse } from '../controllers/parseController.js';

const router = express.Router();

router.post('/', postParse);

export default router;