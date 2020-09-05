import React, { useState } from 'react';
import WrapperComponent from '../WrapperComponent/WrapperComponent';
import styles from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = ({ isAuthenticated, children }) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => setShowSideDrawer(false);
    const openSideDrawerHandler = () => setShowSideDrawer(!showSideDrawer);

    return (
        <WrapperComponent>
            <Toolbar
                isAuthenticated={isAuthenticated}
                openSideDrawer={openSideDrawerHandler} />
            <SideDrawer
                isAuthenticated={isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={styles.content}>
                {children}
            </main>
        </WrapperComponent>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.token != null
});

export default connect(mapStateToProps, null)(Layout);
