import React from 'react';
import styles from './Toolbar.module.scss'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <div className={styles.Toolbar}>
        <DrawerToggle clicked={props.openSideDrawer} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </div>
);

export default Toolbar;