import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const LandingPage = () => {
    return (
        <main className='main-primary'>
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={12}>
                        <div className="contentBox">
                            <h2>Welcome</h2>
                            <h4>To Empire World.</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default LandingPage;