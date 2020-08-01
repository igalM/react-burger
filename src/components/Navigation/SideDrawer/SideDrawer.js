import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import WrapperComponent from '../../../hoc/WrapperComponent/WrapperComponent';

const SideDrawer = (props) => {
    let classes = [styles.SideDrawer, styles.Close];
    if (props.open) {
        classes = [styles.SideDrawer, styles.Open];
    }

    return (
        <WrapperComponent>
            <Backdrop show={props.open} hide={props.closed} />
            <div className={classes.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </WrapperComponent>
    );
}

export default SideDrawer;