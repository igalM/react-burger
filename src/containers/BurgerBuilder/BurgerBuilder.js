import React, { useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import styles from './BurgerBuilder.module.scss';

const BurgerBuilder = ({ history }) => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients);
    const totalPrice = useSelector(state => state.ingredientsReducer.totalPrice);
    const error = useSelector(state => state.ingredientsReducer.error);
    const isAuthenticated = useSelector(state => state.authReducer.token !== null);

    const onAddIngredient = (name) => dispatch(actionCreators.addIngredient(name));
    const onRemoveIngredient = (name) => dispatch(actionCreators.removeIngredient(name));
    const onInitPurchase = () => dispatch(actionCreators.initPurchase());
    const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path));

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, v) => acc + v, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => setPurchasing(false);
    
    const purchaseContinuedHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    }

    const disabled = {
        ...ingredients
    };
    for (let key in disabled) {
        disabled[key] = disabled[key] <= 0;
    }

    let orderSummary = null;
    let buildControls = null;
    let burger = error ? <p>Site broken!</p> : <Spinner />;

    if (ingredients) {
        burger = <div className={styles.Burger}>
            <Burger ingredients={ingredients} />
        </div>

        buildControls = <BuildControls
            added={onAddIngredient}
            removed={onRemoveIngredient}
            disabled={disabled}
            price={totalPrice}
            isAuthenticated={isAuthenticated}
            purchasable={updatePurchasableState(ingredients)}
            orderBtnClick={purchaseHandler}
        />

        orderSummary = <OrderSummary
            cancel={purchaseCancelHandler}
            continuePurchase={purchaseContinuedHandler}
            ingredients={ingredients}
            price={totalPrice}
        />
    }

    return (
        <div className={styles.BurgerBuilder}>
            <Modal open={purchasing} onClose={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            {buildControls}
        </div>
    );
}

export default withErrorHandler(BurgerBuilder, axios);

