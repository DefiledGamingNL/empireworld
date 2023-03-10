
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { query } from '@/lib/db';

// create a transporter using a popular email service such as Gmail
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export default async function sendVerificationEmail(req, res) {
    try {
        // extract user's email from the request body
        const { email } = req.body;

        // generate a unique token for email verification
        const token = uuidv4();

        // insert the token and email into the verification_tokens table

        const result = await query(
            'INSERT INTO verification_tokens (user_email, token) VALUES (?,?)',
            [email, token]
        );

        // send the verification email
        const mailOptions = {
            from: 'noreply@defiledgamingnl.com',
            to: email,
            subject: 'Verify your email',
            html: `
        <p>Please click the following link to verify your email:</p>
        <a href="http://localhost:3000/api/verify?token=${token}">Verify email</a>
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