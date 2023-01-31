import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import classes from './LandingPage.module.css';



const LandingPage = () => {


    return (
        <main className='main-primary'>
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={12}>
                        <div id={classes.contentBox} className='text-center'>
                            <h2>Empire World.</h2>
                            <div className="buttonBox">
                                <Button variant='danger'>Got what it takes?</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default LandingPage;