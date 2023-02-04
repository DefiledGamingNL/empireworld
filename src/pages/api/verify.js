import { query } from '@/lib/db';

export default async function verifyEmail(req, res) {
    try {
        // extract the token from the request query
        const { token } = req.query;

        // retrieve the email associated with the token
        const result = await query(
            'SELECT user_email FROM verification_tokens WHERE token = ?',
            [token]
        );

        // check if a matching token was found
        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // extract the email from the result
        const email = result[0].user_email;

        // update the user's email_verified field in the users table
        await query(
            'UPDATE users SET isVerified = 1 WHERE email = ?',
            [email]
        );

        // delete the token from the verification_tokens table
        await query(
            'DELETE FROM verification_tokens WHERE token = ?',
            [token]
        );

        res.status(200).json({ message: 'Email verified' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify email' });
    }
}