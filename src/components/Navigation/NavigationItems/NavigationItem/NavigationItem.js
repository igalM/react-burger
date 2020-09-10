import React, { useContext } from 'react';
import styles from './NavigationItem.module.scss';
import { NavLink } from 'react-router-dom';
import { DrawerContext } from '../../../../contexts/drawer-context';

const NavigationItem = ({ exact, link, children }) => {

    const toggle = useContext(DrawerContext).toggleDrawer;
    const isMobile = useContext(DrawerContext).isMobile;

    return <li className={styles.NavigationItem}>
        <NavLink
            onClick={isMobile ? toggle : null}
            exact={exact}
            activeClassName={styles.active}
            to={link}>{children}
        </NavLink>
    </li>
};

export default NavigationItem;