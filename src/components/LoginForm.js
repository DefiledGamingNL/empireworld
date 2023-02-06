import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {Alert, Container} from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/auth', {
                email,
                password
            });

            dispatch({ type: 'LOGIN', payload: response.data.data });

            setSuccess(response.data.message);

            setAlertVariant('success');
            setStatus('success');
            setShowAlert(true);

        } catch (err) {
            //console.log(err);
            setError(err.response.data.message);
            setAlertVariant('danger');
            setStatus('error');
            setShowAlert(true);
        }

    };

    return (
        <Container>
            {showAlert && (
                <Alert variant={alertVariant}>
                    {status === 'success' ? success : error }
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </Container>
    );
};

export default Login;