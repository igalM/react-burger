import * as actionTypes from './actionTypes';

export const addIngredient = ingredientName => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});

export const removeIngredient = ingredientName => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});

export const fetchIngredientsSuccess = ingredients => ({
    type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
    ingredients
});

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const fetchIngredients = () => ({
    type: actionTypes.INIT_INGREDIENTS
});
