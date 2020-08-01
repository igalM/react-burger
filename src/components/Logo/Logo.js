import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.scss';

const Logo = (props) => (
    <div className={styles.Logo}>
        <img src={burgerLogo} />
    </div>
);

export default Logo;