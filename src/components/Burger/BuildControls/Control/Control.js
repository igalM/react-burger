import React from 'react';
import styles from './Control.module.scss';

const Control = ({ label, disabled, removed, added }) => (
    <div className={styles.Control}>
        <div className={styles.Label}>{label}</div>
        <button
            disabled={disabled}
            onClick={removed}
            className={styles.Less}>Less</button>
        <button
            onClick={added}
            className={styles.More}>More</button>
    </div>
)

export default Control;