// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Verify Token Route
router.post('/verify-token', verifyToken);

export default router;
