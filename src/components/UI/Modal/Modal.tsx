import React from 'react';
import { Dialog } from '@material-ui/core';

interface Props {
    open: boolean;
    closeHandler: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ open, closeHandler, children }) => {
    return <Dialog open={open} onClose={closeHandler}>
        {children}
    </Dialog>
}


export default Modal;