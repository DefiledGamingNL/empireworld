import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import jwt from "jsonwebtoken";

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

export default async function login(req,res) {
    try {
        // extract the email and password from the request body
        const { email, password } = req.body;



        // check if the user exists in the database
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email],
        );

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
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to login' });
    }
}