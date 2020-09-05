import { combineReducers } from "redux";
import ingredientsReducer from "./burgerBuilder";
import ordersReducer from "./order";
import authReducer from "./auth";

export default combineReducers({
    ingredientsReducer: ingredientsReducer,
    ordersReducer: ordersReducer,
    authReducer: authReducer
});
