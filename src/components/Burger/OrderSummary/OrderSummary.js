import React from 'react';
import { CustomButton } from '../../UI/Button/Button';
import styles from './OrderSummary.module.scss';

const OrderSummary = ({ ingredients, price, continuePurchase, cancel }) => {
    const ings = Object.keys(ingredients)
        .map(key => {
            return <li key={key}><strong>{key}: </strong>{ingredients[key]}</li>;
        });

    return (
        <div className={styles.OrderSummary}>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ings}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <div className={styles.Buttons}>
                <CustomButton onClick={continuePurchase} className="success">CONTINUE</CustomButton>
                <CustomButton onClick={cancel} className="danger">CANCEL</CustomButton>
            </div>
        </div >
    );
}

export default OrderSummary;