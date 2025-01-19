// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quizRoutes from './routes/quizRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
import parseRoutes from './routes/parseRoutes.js';
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
app.use('/api/user', userRoutes); // used for getting user data, adding summary requested, and adding quiz generated
app.use('/api/summary', summaryRoutes); // used for getting summary data
app.use('/api/course', courseRoutes); // used for getting summary data
app.use('/api/quiz', quizRoutes); // used for getting summary data
app.use('/api/upload', uploadRoutes); // used for uploading files
app.use('/api/parse', parseRoutes); // used for parsing files

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
