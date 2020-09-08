import React from 'react';
import WrapperComponent from '../../../hoc/WrapperComponent/WrapperComponent';
import { CustomButton } from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}><strong>{key}: </strong>{props.ingredients[key]}</li>;
        });

    return (
        <WrapperComponent>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <CustomButton onClick={props.continue} className="success">CONTINUE</CustomButton>
            <CustomButton onClick={props.cancel} className="danger">CANCEL</CustomButton>
        </WrapperComponent>
    );
}

export default OrderSummary;