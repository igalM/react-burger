import React from 'react';
import styles from './Spinner.module.scss';

const Spinner: React.FC = () => (
    <div className={styles.Loader}>Loading...</div>
);

export default Spinner;