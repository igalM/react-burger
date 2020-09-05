import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

const Checkout = ({ ingredients, purchased, history, match }) => {

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

const mapStateToProps = state => ({
    ingredients: state.ingredientsReducer.ingredients,
    purchased: state.ordersReducer.purchased
})

export default connect(mapStateToProps, null)(Checkout);
