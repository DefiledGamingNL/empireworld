import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {Modal as BootstrapModal, Button} from "react-bootstrap";

const Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <BootstrapModal>
            <BootstrapModal.Title>
                {title && {title}}
                <BootstrapModal.Body>{children}</BootstrapModal.Body>
                <BootstrapModal.Footer>
                    <Button className='btn btn-lg btn-danger' onClick={handleCloseClick}>Close</Button>
                </BootstrapModal.Footer>
            </BootstrapModal.Title>
        </BootstrapModal>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

const StyledModalBody = styled.div`

  padding-top: 10px;
`;

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  position: fixed;
    top: 20vh;
    left: 25%;
    width: 50%;
    background-color: white;
    padding: 1rem;
    border-radius: 14px;
    box-shadow: rgb(38, 57, 77) 0 20px 30px -10px;
    z-index: 30;
    animation: slide-down 500ms ease-out forwards;
    border: 2px solid #000;
    background-clip: padding-box;
    background: rgba(3,5,11,.97);
`;
const StyledModalOverlay = styled.div`
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.75);
`;

export default Modal;

