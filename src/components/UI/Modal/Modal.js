import React from 'react';
import { Dialog } from '@material-ui/core';

const Modal = ({ open, closeHandler, children }) => {
    return <Dialog open={open} onClose={closeHandler}>
        {children}
    </Dialog>
}


export default Modal;