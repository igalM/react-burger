import React, { useContext } from 'react';
import styles from './NavigationItem.module.scss';
import { NavLink } from 'react-router-dom';
import { DrawerContext } from '../../../../contexts/drawer-context';

interface Props {
    exact?: boolean,
    link: string,
    children: React.ReactNode
}

const NavigationItem: React.FC<Props> = ({ exact, link, children }: Props) => {
    const toggle = useContext(DrawerContext).toggleDrawer;
    const isMobile = useContext(DrawerContext).isMobile;
    const handleLinkClicked = () => isMobile ? toggle() : null;

    return <li className={styles.NavigationItem}>
        <NavLink
            onClick={handleLinkClicked}
            exact={exact}
            activeClassName={styles.active}
            to={link}>{children}
        </NavLink>
    </li>
};

export default NavigationItem;