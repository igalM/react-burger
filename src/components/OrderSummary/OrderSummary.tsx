import React from 'react';
import { Ingredients } from '../../types';
import { CustomButton } from '../UI/Button/Button';
import { makeStyles, createStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    orderSummary: {
        padding: '20px'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

interface Props {
    ingredients: Ingredients;
    price: number;
    continuePurchase: () => void;
    cancel: () => void;
}

const OrderSummary: React.FC<Props> = ({ ingredients, price, continuePurchase, cancel }) => {
    const classes = useStyles();
    const ingredientNames = Object.entries(ingredients)
        .map(([ingredientName, ingredientAmount]) => (
            <li key={ingredientName}>
                <strong>{ingredientName}: </strong>
                {ingredientAmount}
            </li>
        ));

    return (
        <div className={classes.orderSummary}>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientNames}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <div className={classes.buttons}>
                <CustomButton onClick={continuePurchase} color="green">CONTINUE</CustomButton>
                <CustomButton onClick={cancel} color="brown">CANCEL</CustomButton>
            </div>
        </div >
    );
}

export default OrderSummary;