import express from 'express';
import { resendOtp, userSignUp, verifyUserOtp, userLogin } from '../controllers/userAuth.js';
import { getUsers } from '../controllers/userData.js';
import { verifyPass } from '../services/password.js';


const userDetails = express.Router();

userDetails.post('/resend-user-otp', resendOtp)
userDetails.post('/sign-up', userSignUp)
userDetails.post('/verify-user', verifyUserOtp)
userDetails.get('/get-users', getUsers)
userDetails.post('/login', userLogin)

export default userDetails