import React, { Component } from 'react';
import WrapperComponent from '../WrapperComponent/WrapperComponent';
import styles from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <WrapperComponent>
                <Toolbar openSideDrawer={this.openSideDrawerHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </WrapperComponent>
        );
    }
}
export default Layout;