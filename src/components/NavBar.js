import React, {useState} from "react";

import { Container, Nav, Navbar} from 'react-bootstrap';
import Modal from "@/components/ui/Modal/Modal";
import RegisterForm from "@/components/RegisterForm";
import Login from "@/components/LoginForm";


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
                            <Login />
                        </Modal>

                        <Nav.Link><button className='btn btn-xs btn-danger' onClick={() => setShowRegisterModal(true)}>Register</button></Nav.Link>
                        <Modal
                            onClose={() => setShowRegisterModal(false)}
                            show={showRegisterModal}
                        >
                            <RegisterForm />
                        </Modal>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;