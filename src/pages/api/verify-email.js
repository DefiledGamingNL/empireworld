
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { query } from '@/lib/db';

// create a transporter using a popular email service such as Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreplyempireworld@gmail.com',
        pass: 'HalloDikkieDik.123'
    }
});

export default async function sendVerificationEmail(NextApiRequest, NextApiResponse) {
    try {
        // extract user's email from the request body
        const { email } = NextApiRequest.body;

        // generate a unique token for email verification
        const token = uuidv4();

        // insert the token and email into the verification_tokens table

        const result = await query(
            'INSERT INTO verification_tokens (user_email, token) VALUES (?,?)',
            [email, token]
        );

        // send the verification email
        const mailOptions = {
            from: 'noreplyempireworld@gmail.com',
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

        NextApiResponse.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error(error);
        NextApiResponse.status(500).json({ message: 'Failed to send verification email' });
    }
}