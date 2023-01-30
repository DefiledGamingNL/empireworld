import React, {useState} from "react";

import { Container, Row, Col, Nav, Navbar} from 'react-bootstrap';
import Link from "next/link";
import Modal from "@/components/ui/Modal/Modal";


const NavBar = () => {

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    return (
        <Navbar variant='dark' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>

                        <Nav.Link><button className='btn btn-xs btn-success' onClick={() => setShowLoginModal(true)}>Login</button></Nav.Link>
                        <Modal
                            onClose={() => setShowLoginModal(false)}
                            show={showLoginModal}
                        >
                            Hello from the Login Modal!
                        </Modal>

                        <Nav.Link><button className='btn btn-xs btn-danger' onClick={() => setShowRegisterModal(true)}>Register</button></Nav.Link>
                        <Modal
                            onClose={() => setShowRegisterModal(false)}
                            show={showRegisterModal}
                        >
                            Hello from the register Modal!
                        </Modal>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;