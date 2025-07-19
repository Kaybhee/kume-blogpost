import express from 'express';
import { resendUserOtp, userSignUp } from '../controllers/userData.js';


const userDetails = express.Router();

userDetails.post('resend-user-otp', resendUserOtp)
userDetails.post('sign-up', userSignUp)

export default userDetails