import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const key = process.env.JWT_SECRET;

export const signUser = async(user) => {
        const token = jwt.sign({ id: user._id, key, expiresIn: '60d' });
        return token;
}



