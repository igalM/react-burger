import React from 'react';
import styles from './Modal.module.scss';
import WrapperComponent from '../../../hoc/WrapperComponent/WrapperComponent';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, hide, children }) => {

    const modalClasses = [styles.Modal];
    if (show) {
        modalClasses.push(styles.show);
    }

    return (
        <WrapperComponent>
            <Backdrop show={show} hide={hide} />
            <div className={modalClasses.join(' ')}>
                {children}
            </div>
        </WrapperComponent>
    );
};

export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children);