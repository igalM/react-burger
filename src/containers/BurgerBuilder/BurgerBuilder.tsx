import React, { useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { Ingredients } from '../../types';
import { useHistory } from 'react-router';
import {
    selectBurgerErrorState,
    selectIngredientsState,
    selectIsAuthenticatedState,
    selectTotalPrice
} from '../../store/reducers/selectors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    burgerBuilder: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column'
    },
    burger: {
        height: '100%',
        marginBottom: '20px',
        display: 'flex',
        overflow: 'auto'
    }
}));

const BurgerBuilder: React.FC = () => {
    const classes = useStyles();
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory();

    const ingredients = useSelector(selectIngredientsState);
    const totalPrice = useSelector(selectTotalPrice);
    const error = useSelector(selectBurgerErrorState);
    const isAuthenticated = useSelector(selectIsAuthenticatedState);

    const dispatch = useDispatch();
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
        burger = <div className={classes.burger}>
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
        <div className={classes.burgerBuilder}>
            <Modal open={purchasing} closeHandler={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            {buildControls}
        </div>
    );
}

export default withErrorHandler(BurgerBuilder, axios);

