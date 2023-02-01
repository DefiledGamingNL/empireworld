import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import classes from './RegisterForm.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            name: name.trim(),
            email: email.trim(),
            password: encryptedPassword
        };
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(newUser);
            const res = await axios.post('/api/users', body, config);
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formName">
                            <Form.Label className={classes.formLabel}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className={classes.formLabel}>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className={classes.formLabel}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={e => onChange(e)}
                                minLength="6"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword2">
                            <Form.Label className={classes.formLabel}>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={e => onChange(e)}
                                minLength="6"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;