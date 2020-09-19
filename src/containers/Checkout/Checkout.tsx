import React from 'react';
import { Redirect } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import { useSelector } from 'react-redux';
import {
    selectIngredientsState,
    selectPurchasedState,
} from '../../store/reducers/selectors';
import CheckoutForm from '../../components/Forms/CheckoutForm/CheckoutForm';

const styles = {
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
        textAlign: 'center' as const
    }
}

const Checkout: React.FC = () => {

    const ingredients = useSelector(selectIngredientsState);
    const purchased = useSelector(selectPurchasedState);

    let orderSummary = <Redirect to="/" />;
    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        orderSummary = (
            <div style={styles.burger}>
                {purchasedRedirect}
                <h1 style={styles.title}>We hope it tastes well!</h1>
                <Burger ingredients={ingredients} />
            </div>
        );
    }

    return (
        <div style={styles.checkout}>
            {orderSummary}
            <CheckoutForm />
        </div>
    );
}

export default Checkout;
