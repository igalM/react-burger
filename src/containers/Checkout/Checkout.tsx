import React from 'react';
import { Redirect } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import { useSelector } from 'react-redux';
import {
    selectIngredientsState,
    selectPurchasedState,
} from '../../store/reducers/selectors';
import CheckoutForm from '../../components/Forms/CheckoutForm/CheckoutForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    checkout: {
        display: 'flex',
        flexFlow: 'column'
    },
    burger: {
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto'
    },
    title: {
        textAlign: 'center'
    }
}));

const Checkout: React.FC = () => {
    const classes = useStyles();
    const ingredients = useSelector(selectIngredientsState);
    const purchased = useSelector(selectPurchasedState);

    let orderSummary = <Redirect to="/" />;
    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        orderSummary = (
            <div className={classes.burger}>
                {purchasedRedirect}
                <h1 className={classes.title}>We hope it tastes well!</h1>
                <Burger ingredients={ingredients} />
            </div>
        );
    }

    return (
        <div className={classes.checkout}>
            {orderSummary}
            <CheckoutForm />
        </div>
    );
}

export default Checkout;
