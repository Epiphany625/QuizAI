// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { PORT } from './config/config.js';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes); // used for registration, login, and token verification
app.use('/api/user', userRoutes); // used for getting user data
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
