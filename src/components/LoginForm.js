import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {useRouter} from 'next/router';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth', { email, password });
            const token = res.data.token;

            // Store the token in local storage
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            await router.push('/');

        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;