import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    isBuildingBurger: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
};


const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredientHelper(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredientHelper(state, action);
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccessHelper(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailedHelper(state, action)
        default:
            return state;
    }
}

const addIngredientHelper = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        isBuildingBurger: true
    };
    return updateObject(state, updatedState);
}

const removeIngredientHelper = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        isBuildingBurger: true
    };
    return updateObject(state, updatedState);
}

const fetchIngredientsSuccessHelper = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        isBuildingBurger: false
    });
}

const fetchIngredientsFailedHelper = (state, action) => {
    return updateObject(state, {
        error: false
    });
}

export default ingredientsReducer;
