import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import classes from '../styles/LandingPage.module.scss';
import Modal from "@/components/ui/Modal/Modal";
import RegisterForm from "@/components/RegisterForm";



const LandingPage = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <main className={classes.mainPrimary}>
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={12}>
                        <div id={classes.contentBox} className='text-center'>
                            <h2 className={classes.shadows}>Empire World</h2>
                            <h4 className={classes.shadows}>the Syndicate of crimes!</h4>
                            <div className="buttonBox">
                                <Button className={classes.shadows + ' btn btn-lg btn-danger ' + classes.buttonStyle} onClick={() => setShowRegisterModal(true)}>Got what it takes?</Button>
                                <Modal
                                    onClose={() => setShowRegisterModal(false)}
                                    show={showRegisterModal}
                                >
                                    <RegisterForm />
                                </Modal>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default LandingPage;