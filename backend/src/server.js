import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Database connection

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);

// Route
app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})

