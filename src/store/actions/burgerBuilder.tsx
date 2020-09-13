import * as actionTypes from './actionTypes';
import { typedAction } from '../../shared/utility';
import { Ingredients } from '../../types';

export const addIngredient = (ingredientName: string) => {
    return typedAction(actionTypes.ADD_INGREDIENT, ingredientName);
};

export const removeIngredient = (ingredientName: string) => {
    return typedAction(actionTypes.REMOVE_INGREDIENT, ingredientName);
};

export const fetchIngredientsSuccess = (ingredients: Ingredients) => {
    return typedAction(actionTypes.FETCH_INGREDIENTS_SUCCESS, ingredients);
};

export const fetchIngredientsFailed = () => {
    return typedAction(actionTypes.FETCH_INGREDIENTS_FAILED);
};

export const fetchIngredients = () => {
    return typedAction(actionTypes.INIT_INGREDIENTS);
};


export type IngredientActions =
    ReturnType<
        typeof fetchIngredients |
        typeof fetchIngredientsFailed |
        typeof fetchIngredientsSuccess |
        typeof removeIngredient |
        typeof addIngredient>;
