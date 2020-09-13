import { combineReducers } from "redux";
import ingredientsReducer from "./burgerBuilder";
import ordersReducer from "./order";
import authReducer from "./auth";


export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    ordersReducer: ordersReducer,
    authReducer: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
