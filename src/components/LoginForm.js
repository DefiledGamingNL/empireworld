import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            const { data } = response;
            localStorage.setItem("token", data.token);
            setLoading(false);
            await router.push("/dashboard");
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
};

export default Login;