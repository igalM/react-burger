import React from 'react';
import styles from './Control.module.scss';

const Control = (props) => (
    <div className={styles.Control}>
        <div className={styles.Label}>{props.label}</div>
        <button
            disabled={props.disabled}
            onClick={props.removed}
            className={styles.Less}>Less</button>
        <button
            onClick={props.added}
            className={styles.More}>More</button>
    </div>
)

export default Control;