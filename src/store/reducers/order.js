import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccessHelper(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailedHelper(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStartHelper(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccessHelper(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStartHelper(state, action);
        case actionTypes.PURCHASE_INIT:
            return purchaseBurgerInitHelper(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFailedHelper(state, action);
        default:
            return state;
    }
}

const fetchOrdersSuccessHelper = (state, action) => {
    const orders = [];
    for (let i in action.orders) {
        orders.push({
            ...action.orders[i],
            id: i
        });
    }
    return updateObject(state, {
            orders: orders.reverse(),
            loading: false
        }
    );
}

const fetchOrdersFailedHelper = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchOrdersStartHelper = (state, action) => {
    return updateObject(state, {loading: true});
}

const purchaseBurgerSuccessHelper = (state, action) => {
    const order = {
        ...action.orderData,
        id: action.orderId
    };
    const updatedOrders = [...state.orders, order];
    return updateObject(state, {
        orders: updatedOrders,
        loading: false,
        purchased: true
    });
}

const purchaseBurgerStartHelper = (state, action) => {
    return updateObject(state, {loading: true});
}

const purchaseBurgerInitHelper = (state, action) => {
    return updateObject(state, {purchased: false});
}

const purchaseBurgerFailedHelper = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: false
    });
}
export default ordersReducer;
