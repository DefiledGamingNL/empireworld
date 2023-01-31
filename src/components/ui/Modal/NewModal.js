import classes from './NewModal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onHideLogin} />;
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const NewModal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onHideLogin={props.onHideLogin} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default NewModal;
