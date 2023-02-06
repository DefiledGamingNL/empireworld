import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Container, Nav, Navbar} from 'react-bootstrap';
import Modal from "@/components/ui/Modal/Modal";
import RegisterForm from "@/components/RegisterForm";
import Login from "@/components/LoginForm";


const NavBar = () => {

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('token');

    }
    const { isLoggedIn } = useSelector(state => state);


    return (
        <Navbar variant='dark' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        {isLoggedIn ? (
                            <Nav.Link><button className='btn btn-xs btn-success' onClick={handleLogOut}>Logout</button></Nav.Link>
                        ) : [<Nav.Link key='login'><button className='btn btn-xs btn-success' onClick={() => setShowLoginModal(true)}>Login</button></Nav.Link>
                            ,<Nav.Link key='register'><button className='btn btn-xs btn-danger' onClick={() => setShowRegisterModal(true)}>Signup</button></Nav.Link>]

                            }

                        <Modal
                            onClose={() => setShowRegisterModal(false)}
                            show={showRegisterModal}
                        >
                            <RegisterForm />
                        </Modal>
                            <Modal
                            onClose={() => setShowLoginModal(false)}
                            show={showLoginModal}
                            >
                            <Login />
                            </Modal>




                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;