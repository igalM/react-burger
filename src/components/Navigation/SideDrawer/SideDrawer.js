import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    let classes = [styles.SideDrawer, styles.Close];
    if (props.open) {
        classes = [styles.SideDrawer, styles.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.open} hide={props.closed} />
            <div className={classes.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
}

export default SideDrawer;
