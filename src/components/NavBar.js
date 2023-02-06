import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Container, Nav, Navbar} from 'react-bootstrap';
import MyModal from "@/components/ui/Modal/Modal";
import {useRouter} from "next/router";


const NavBar = () => {

    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState("register");
    const dispatch = useDispatch();
    const handleLogOut = () => {
        const router = useRouter();
        dispatch({type: "LOGOUT"});
        localStorage.removeItem('token');
        router.push('/');

    }
    const {isLoggedIn} = useSelector(state => state);


    return (
        <Navbar variant='dark' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        {isLoggedIn ? (
                            <Nav.Link>
                                <button className='btn btn-xs btn-success' onClick={handleLogOut}>Logout</button>
                            </Nav.Link>
                        ) : [<Nav.Link key='login'>
                            <button className='btn btn-xs btn-success' onClick={() => {
                                setShowModal(true);
                                setFormType("login")
                            }}>Login
                            </button>
                        </Nav.Link>
                            , <Nav.Link key='register'>
                                <button className='btn btn-xs btn-danger' onClick={() => {
                                    setShowModal(true);
                                    setFormType("register")
                                }}>Signup
                                </button>
                            </Nav.Link>]
                        }
                        <MyModal show={showModal} onHide={() => setShowModal(false)} formType={formType} />

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;