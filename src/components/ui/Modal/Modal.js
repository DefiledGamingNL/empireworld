import React  from "react";
import { Modal, Button } from "react-bootstrap";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import classes from '@/styles/Modal.module.scss';

const MyModal = ({ show, onHide, formType }) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className={classes.modalHeader} closeButton>
                <Modal.Title className={classes.modalTitle}>{formType === "register" ? "Register" : "Login"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formType === "register" ? <RegisterForm /> : <LoginForm />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;