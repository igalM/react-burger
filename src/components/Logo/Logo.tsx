import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.scss';

const Logo: React.FC = () => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="Logo" />
    </div>
);

export default Logo;