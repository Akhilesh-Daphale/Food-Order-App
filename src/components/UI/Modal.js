import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";


function Backdrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
}

function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalElemnt = document.getElementById("overlays");

export default function Modal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElemnt)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemnt)}
        </React.Fragment>
    );
}