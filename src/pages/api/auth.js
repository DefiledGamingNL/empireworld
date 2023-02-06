import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import jwt from "jsonwebtoken";

export default async function auth(req, res) {

// extract the email and password from the request body
        const email = req.body.email;
        //console.log('email:', email);
        const password = req.body.password;
        //console.log('password:', password);
        //check if a password was given



        // check if the user exists in the database
        const rows = await query('SELECT * FROM users WHERE email = ?', [email]);

        //console.log(rows);
        if (!rows) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (rows[0] === undefined) {
            return res.status(404).json({ message: 'No entries found' });
        }
        else {
            const user = rows[0];
            //console.log('user:', user);
            //console.log('password:', password);
            //console.log('email:', email);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            //console.log('isPasswordValid:', isPasswordValid);

            if (!isPasswordValid) {
                //console.log(isPasswordValid);
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            res.status(200).json({
                message: 'Login successful',
                token,
            });
        }

}



