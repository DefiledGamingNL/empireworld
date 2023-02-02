// api/users.js
import { query } from '@/lib/db';

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { name, email, password } = req.body;
            try {
                const result = await query(
                    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                    [name, email, password]
                );
                return res.status(200).json({ message: 'User created successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to create user' });
            }
        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
};