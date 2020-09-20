import React from 'react';
import { Ingredients } from '../../../types';
import { CustomButton } from '../../UI/Button/Button';
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

const OrderSummary: React.FC<Props> = ({ ingredients, price, continuePurchase, cancel }: Props) => {
    const classes = useStyles();
    const ings = Object.keys(ingredients)
        .map(key => {
            return <li key={key}><strong>{key}: </strong>{ingredients[key]}</li>;
        });

    return (
        <div className={classes.orderSummary}>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ings}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <div className={classes.buttons}>
                <CustomButton onClick={continuePurchase} className="success">CONTINUE</CustomButton>
                <CustomButton onClick={cancel} className="danger">CANCEL</CustomButton>
            </div>
        </div >
    );
}

export default OrderSummary;