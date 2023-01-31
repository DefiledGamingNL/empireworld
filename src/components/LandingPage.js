import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import classes from './LandingPage.module.css';
import {useRouter} from "next/navigation";



const LandingPage = () => {
const router = useRouter();

    return (
        <main className={classes.mainPrimary + " " + classes.shadows}>
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={12}>
                        <div id={classes.contentBox} className='text-center'>
                            <h2>Empire World</h2>
                            <div className="buttonBox">
                                <Button className={'btn btn-lg btn-danger ' + classes.buttonStyle} onClick={() => router.push('/register')}>Got what it takes?</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default LandingPage;