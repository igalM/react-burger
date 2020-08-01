import React, { Component } from 'react';
import styles from './Modal.module.scss';
import WrapperComponent from '../../../hoc/WrapperComponent/WrapperComponent';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {

        const modalClasses = [styles.Modal];
        if (this.props.show) {
            modalClasses.push(styles.show);
        }

        return (
            <WrapperComponent>
                <Backdrop show={this.props.show} hide={this.props.hide} />
                <div className={modalClasses.join(' ')}>
                    {this.props.children}
                </div>
            </WrapperComponent>
        );
    }
};

export default Modal;