import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {Container} from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/auth', {
                email,
                password
            });

            dispatch({ type: 'LOGIN', payload: response.data.data });
            setSuccess('Succesvol ingelogd');
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </Container>
    );
};

export default Login;