import React, { Component } from 'react';
import WrapperComponent from '../../hoc/WrapperComponent/WrapperComponent';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, v) => acc + v, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        const disabled = {
            ...this.props.ingredients
        };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Site broken!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <WrapperComponent>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        added={this.props.onAddIngredient}
                        removed={this.props.onRemoveIngredient}
                        disabled={disabled}
                        price={this.props.totalPrice}
                        isAuthenticated={this.props.isAuthenticated}
                        purchasable={this.updatePurchasableState(this.props.ingredients)}
                        orderBtnClick={this.purchaseHandler}
                    />
                </WrapperComponent>
            );
            orderSummary = <OrderSummary
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinuedHandler}
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
            />
        }

        return (
            <WrapperComponent>
                <Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </WrapperComponent>
        );
    }

}

const mapStateToProps = state => ({
    ingredients: state.ingredientsReducer.ingredients,
    totalPrice: state.ingredientsReducer.totalPrice,
    error: state.ingredientsReducer.error,
    purchased: state.ordersReducer.purchased,
    isAuthenticated: state.authReducer.token !== null
})

const mapDispatchToProps = dispatch => ({
    onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
    onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),
    onInitIngredients: () => dispatch(actionCreators.fetchIngredients()),
    onInitPurchase: () => dispatch(actionCreators.initPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

