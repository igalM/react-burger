import React from 'react';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.hide}></div> : null
);

export default Backdrop;