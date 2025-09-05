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
        const savedData = await userData.save();        
        res.status(201).json({message: "User created successfully", data: {savedData, code}})
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
        
    } catch (err) {

    }
}

export const userLogin = async(req, res) => {
    const { email, password } = req.body;
    try {

    }
    catch (err) {
        
    }
}