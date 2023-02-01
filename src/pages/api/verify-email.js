import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

// create a transporter using a popular email service such as Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

export default async function sendVerificationEmail(req: NextApiRequest, res: NextApiResponse) {
    try {
        // extract user's email from the request body
        const { email } = req.body;

        // generate a unique token for email verification
        const token = uuidv4();

        // store the token and email in the database
        // ...

        // send the verification email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Verify your email',
            html: `
        <p>Please click the following link to verify your email:</p>
        <a href="http://localhost:3000/verify-email?token=${token}">Verify email</a>
      `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            }
            console.log(`Email sent: ${info.response}`);
        });

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send verification email' });
    }
}