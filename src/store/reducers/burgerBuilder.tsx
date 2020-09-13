import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { Ingredients } from '../../types';
import { IngredientActions } from '../actions/burgerBuilder';

interface IngredientsState {
    ingredients: Ingredients,
    totalPrice: number,
    error: boolean,
    isBuildingBurger: boolean
}

const initialState: IngredientsState = {
    ingredients: { bacon: 0, salad: 0, cheese: 0, meat: 0 },
    totalPrice: 4,
    error: false,
    isBuildingBurger: false
}

const INGREDIENT_PRICE: Ingredients = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
};

const ingredientsReducer = (state = initialState, action: IngredientActions): IngredientsState => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredientHelper(state, action.payload);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredientHelper(state, action.payload);
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccessHelper(state, action.payload)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailedHelper(state)
        default:
            return state;
    }
}

const addIngredientHelper = (state: IngredientsState, payload: string): IngredientsState => {
    const updatedIngredient = { [payload]: state.ingredients[payload] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[payload],
        isBuildingBurger: true
    };
    return updateObject(state, updatedState);
}

const removeIngredientHelper = (state: IngredientsState, payload: string): IngredientsState => {
    const updatedIngredient = { [payload]: state.ingredients[payload] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[payload],
        isBuildingBurger: true
    };
    return updateObject(state, updatedState);
}

const fetchIngredientsSuccessHelper = (state: IngredientsState, payload: Ingredients): IngredientsState => {
    return updateObject(state, {
        ingredients: payload,
        error: false,
        totalPrice: 4,
        isBuildingBurger: false
    });
}

const fetchIngredientsFailedHelper = (state: IngredientsState): IngredientsState => {
    return updateObject(state, {
        error: false
    });
}

export default ingredientsReducer;
