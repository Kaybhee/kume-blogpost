import appForm from '../model.js';
import NodeCache from 'node-cache';
import { hashPass, verifyPass } from '../services/password.js';
import { sendEmails } from '../services/mail.js';

const cache = new NodeCache();



export const userSignUp =  async(req, res) => {
    try {
        const { name, password, email } = req.body;
        const existingUser = await appForm.findOne({email, name});
        if (existingUser) {
            return res.status(400).json({message: "User already exists", data: null});
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        cache.set(email, code.toString(), 3600000);
        const emailData = await sendEmails(email, {
            subject: "Kume Blog",
            message: `Your otp code is ${code}`
        })
        if (!emailData) {
            return res.status(500).json({message: "Failed to send email", data: null});
        }

        const userData = await appForm.create({
            name,
            email,
            password: await hashPass(password)
        })
        const { password: _, ...userCred } = userData._doc;
        // const savedData = await userCred.save();        
        res.status(201).json({message: "User created successfully", data: {userCred, code}})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Internal server error", error: err.message})
    }
}


export const resendOtp = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await appForm.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found", data: null});
        }
        const code = Math.floor( 100000 + Math.random() * 900000);
        cache.set(email, code.toString(), 3600000);
        const emailData = await sendEmails(email, {
            subject: "Kume Blog",
            message: `Your otp code is ${code}`
        })
        if (!emailData) {
            return res.status(500).json({message: "Failed to send email", data: null});
        }
        return res.status(200).json({message: "Otp resent successfully", data: code});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server error'})
    }
}


export const verifyUserOtp = async(req, res) => {
    try {
        const { email, code } = req.body;
        const cached = cache.get(email);
        if (!email) {
            return res.status(400).json({
                message: "Email is required", 
                data: null
            })
        }
        else if (cached !== code.toString()) {
            return res.status(400).json({
                message: "Invalid otp", data: null
            })
        } else {
            const user = await appForm.findOne({email});
            if(!user) {
                return res.status(404).json({
                    message: "User not found", data: null
                })
            } else{
                user.isVerified = true;
                const form = await user.save();
                return res.status(200).json({
                    status: true,
                    message: "User verified successfuly",
                    data: form
                })
            }
        }

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: null
        })
    }
}

export const userLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const loggingUser = await appForm.findOne({email});
        if (!loggingUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: null
            })
        }
        if (!loggingUser.isVerified) {
            return res.status(401).json({
                status: false,
                message: "User not verified",
                data: null
            })
        } else {
            const isPassValid = await verifyPass(password, loggingUser.password);
            if (!isPassValid) {
                return res.status(401).json({ message: "Invalid credentials", data: null });
            }
            return res.status(200).json({
                status: true,
                message: "Login Successful",
                data: loggingUser
            })
        }
        
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null
        })
    }
}