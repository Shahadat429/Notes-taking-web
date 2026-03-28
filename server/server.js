import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


//mongodb connection
await connectDB();

// allowed multiple origins
const allowedOrigins = [
    'http://localhost:5173'
]

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => {
    res.send('Notesssssssssssssssssssssssssssssssssss');
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})