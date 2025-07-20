import express from 'express'
import appForm from '../model.js';





export const resendUserOtp = async(req, res) => {
    
}

export const userSignUp =  async(req, res) => {
    try {
        const signForm = new appForm(req.body);
        const existingUser = await appForm.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(400).json({message: "User already exist with this email", data: null});
        }
        await signForm.save();
        res.status(201).json({message: "User created successfully", data: signForm})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Internal server error", error: err.message})
    }
}