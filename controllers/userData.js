import express from 'express'
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
        cache.set(email, code.toString(), 120);
        const emailData = await sendEmails(email, {
            subject: "Kume blog post otp",
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
        const savedData = await userData.save();        
        res.status(201).json({message: "User created successfully", data: {savedData, code}})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Internal server error", error: err.message})
    }
}


export const resendUserOtp = async(req, res) => {
    
}
