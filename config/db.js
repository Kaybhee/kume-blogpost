import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export const MONGODB_URL = process.env.MONGODB_URL


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(MONGODB_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`)

    }
    catch (err) {
        console.error(`Error: ${err.message}`)
        process.exit(1);
    }
}

export default connectDB;