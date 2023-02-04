import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import jwt from "jsonwebtoken";

export default async function login(req, res) {


    try {
// extract the email and password from the request body
        const email = req.body.email;
        const password = req.body.password;
        //check if a password was given



        // check if the user exists in the database
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);

        if (!rows) {
            return res.status(500).json({ message: 'could not retrieve user data' });

        }
        // return a 404 if the user does not exist
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });

        }

        // compare the passwords
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // return a 401 if the password is incorrect
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }




        // return a 200 and the user data if the login is successful
        const token = jwt.sign({
            id: rows[0].id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'an error occured' });
    }
}