import express from 'express';
import { resendOtp, userSignUp } from '../controllers/userData.js';


const userDetails = express.Router();

userDetails.post('/resend-user-otp', resendOtp)
userDetails.post('/sign-up', userSignUp)

export default userDetails