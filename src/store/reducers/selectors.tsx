import { Ingredients } from '../../types';
import { RootState } from './index';
import { createSelector } from 'reselect';

const INGREDIENT_PRICE: Ingredients = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
};

// burgerBuilder selectors //

export const selectIngredientsState = (state: RootState) => state.ingredientsReducer.ingredients;
export const selectBurgerErrorState = (state: RootState) => state.ingredientsReducer.error;
export const selectIsBuildingBurgerState = (state: RootState) => state.ingredientsReducer.isBuildingBurger;

export const selectTotalPrice = createSelector(
    selectIngredientsState, ings => {
        return Object.entries(ings)
            .reduce((acc, current) => acc + INGREDIENT_PRICE[current[0]] * current[1], 0);
    }
);

// orders selectors //

export const selectOrdersState = (state: RootState) => state.ordersReducer.orders;
export const selectPurchasedState = (state: RootState) => state.ordersReducer.purchased;
export const selectOrdersLoadingState = (state: RootState) => state.ordersReducer.loading;



// auth selectors //

export const selectTokenState = (state: RootState) => state.authReducer.token;
export const selectUserIdState = (state: RootState) => state.authReducer.userId;
export const selectAuthLoadingState = (state: RootState) => state.authReducer.loading;
export const selectAuthErrorState = (state: RootState) => state.authReducer.error;
export const selectIsAuthenticatedState = (state: RootState) => state.authReducer.token !== null;
export const selectAuthRedirectPathState = (state: RootState) => state.authReducer.authRedirectPath;
