import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { MONGODB_URL } from './config/db.js'; // Adjusted import to match the new structure
import  connectDB from './config/db.js';
import userDetails from './routes/signupDetails.js';
const app = express();
dotenv.config();

app.use(cors('*'));
app.use(morgan('dev'))
app.use(express.json());

const PORT = process.env.PORT || 5000;
// const MONGODB_URL = process.env.MONGODB_URL;
connectDB();


app.use('/api/v1/', userDetails);

app.listen(PORT ||MONGODB_URL, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

