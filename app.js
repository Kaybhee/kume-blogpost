import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { MONGODB_URL } from './config/db.js'; // Adjusted import to match the new structure
import  connectDB from './config/db.js';
import userDetails from './routes/signupDetails.js';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors('*'));
app.use(morgan('dev'))


const PORT = 5000;
connectDB();

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', userDetails);

app.listen(PORT || MONGODB_URL, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

