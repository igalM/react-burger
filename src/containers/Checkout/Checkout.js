import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { useSelector } from 'react-redux';

// COMBINE CONTACT DATA TO THIS COMPONENT //

const Checkout = ({ history, match }) => {

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients)
    const purchased = useSelector(state => state.ordersReducer.purchased)

    const checkoutCanceledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    }


    let summary = <Redirect to="/" />;
    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCanceled={checkoutCanceledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
}

export default Checkout;
