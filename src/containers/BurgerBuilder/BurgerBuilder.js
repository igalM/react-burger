import React, { Component } from 'react';
import WrapperComponent from '../../hoc/WrapperComponent/WrapperComponent';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
};


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(res => this.setState({ ingredients: res.data }))
            .catch(err => this.setState({ error: true }));
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, v) => acc + v, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuedHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    ingredientAddedHandler = (type) => {
        const count = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchasableState(updatedIngredients);
    }

    ingredientRemovedHandler = (type) => {
        const count = this.state.ingredients[type] - 1;
        if (count < 0) return;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchasableState(updatedIngredients);
    }

    render() {

        const disabled = {
            ...this.state.ingredients
        };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Site broken!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <WrapperComponent>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        added={this.ingredientAddedHandler}
                        removed={this.ingredientRemovedHandler}
                        disabled={disabled}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        orderBtnClick={this.purchaseHandler}
                    />
                </WrapperComponent>
            );
            orderSummary = <OrderSummary
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinuedHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);

