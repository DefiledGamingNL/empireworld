import React, {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import store from '@/store/store';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/auth`, {
                email,
                password,
            });
            dispatch(store(response.data.data));
            localStorage.setItem('token', response.e.data.token);
            await router.push('/');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;