import React from 'react';
import styles from './CheckoutSummary.module.scss';
import Burger from '../../Burger/Burger';
import { CustomButton } from '../../UI/Button/Button';

const CheckoutSummary = props => (
    <div className={styles.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div className={styles.Burger}>
            <Burger ingredients={props.ingredients} />
        </div>
        <CustomButton className="danger" onClick={props.checkoutCanceled}>CANCEL</CustomButton>
        <CustomButton className="success" onClick={props.checkoutContinued}>CONTINUE</CustomButton>
    </div>
);

export default CheckoutSummary;