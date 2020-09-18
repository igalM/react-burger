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
import { RootState } from '../../store/reducers';
import { Ingredients } from '../../types';
import { RouteComponentProps } from 'react-router';

const BurgerBuilder: React.FC<RouteComponentProps> = ({ history }) => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ingredients = useSelector((state: RootState) => state.ingredientsReducer.ingredients);
    const totalPrice = useSelector((state: RootState) => state.ingredientsReducer.totalPrice);
    const error = useSelector((state: RootState) => state.ingredientsReducer.error);
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.token !== null);

    const onAddIngredient = (name: string) => dispatch(actionCreators.addIngredient(name));
    const onRemoveIngredient = (name: string) => dispatch(actionCreators.removeIngredient(name));
    const onInitPurchase = () => dispatch(actionCreators.initPurchase());
    const onSetAuthRedirectPath = (path: string) => dispatch(actionCreators.setAuthRedirectPath(path));

    const updatePurchasableState = (ingredients: Ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key: string) => ingredients[key])
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

    const disabled: Ingredients = {
        ...ingredients
    };

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
            <Modal open={purchasing} closeHandler={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            {buildControls}
        </div>
    );
}

export default withErrorHandler(BurgerBuilder, axios);

