import React from "react";

import { Container, Row, Col, Nav, Navbar} from 'react-bootstrap';
import Link from "next/link";


const NavBar = () => {
    return (
        <Navbar variant='dark' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Link href='/' passHref><Nav.Link>Home</Nav.Link></Link>
                        <Link href='/login' passHref><Nav.Link>Login</Nav.Link></Link>
                        <Link href='/register' passHref><Nav.Link>Register</Nav.Link></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;