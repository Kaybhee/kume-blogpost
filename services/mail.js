import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmails = async (to, data) => {
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
})
const sendHtml = `!<DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A demo blogpost</title>
    </head>
    <body>
        <div class="body" style="text-align: center; font-family: sans-serif">
        <h3>Welcome to a Demo blogpost</h3>
        <p>${data.message}</p>
        <p>Thanks, <br />kume blogpost</p>
        </div>
    </body>
<html>`

const mailAction = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: data.subject || "Kume Blogpost Notification",
    html: sendHtml,
}
try {
    const userInfo = await transporter.sendMail(mailAction);
    return true;
} catch (err) {
    console.error(err);
    return false;
}
}
