import bcrypt from 'bcrypt';
import express from 'express';
import appForm from '../model.js';


export const hashPass = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


export const verifyPass = async(password, hashPass) => {
    return await bcrypt.compare(password, hashPass);
}