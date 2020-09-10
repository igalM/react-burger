import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = ({ isAuthenticated }) => {

    let authenticatedRoutes = <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
    </ul>;
    if (!isAuthenticated) {
        authenticatedRoutes = <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        </ul>;
    }
    return authenticatedRoutes;
};

export default NavigationItems;
