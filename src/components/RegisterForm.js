import {Button, Col, Container, Form, Row} from "react-bootstrap";
import classes from './RegisterForm.module.css';
export default function RegisterForm() {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Is this your full name: ${result.data}`)
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <Container>
            <Row>
                <Col md={12} className='d-flex justify-content-center'>
                    <Form onSubmit={handleSubmit} className='d-inline-flex flex-column'>
                        <Form.Group className='mb-3'  controlId='formBasicEmail'>
                            <Form.Label className={classes.formLabel}>Email Address</Form.Label>
                            <Form.Control type='email' name='email' placeholder='Enter email' />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className={classes.formLabel}>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}