import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { OrderActions } from '../actions/order';
import { Order } from '../../types';

interface OrderState {
    orders: Order[],
    loading: boolean,
    purchased: boolean
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    purchased: false
}

const ordersReducer = (state = initialState, action: OrderActions): OrderState => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccessHelper(state, action.payload);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailedHelper(state);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStartHelper(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccessHelper(state, action.payload);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStartHelper(state);
        case actionTypes.PURCHASE_INIT:
            return purchaseBurgerInitHelper(state);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFailedHelper(state);
        default:
            return state;
    }
}

const fetchOrdersSuccessHelper = (state: OrderState, payload: Order[]): OrderState => {
    const orders = [];
    for (let i in payload) {
        orders.push({
            ...payload[i],
            id: i
        });
    }
    return updateObject(state, {
        orders: orders.reverse(),
        loading: false
    }
    );
}

const fetchOrdersFailedHelper = (state: OrderState): OrderState => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStartHelper = (state: OrderState): OrderState => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccessHelper = (state: OrderState, payload: { orderId: string, orderData: Order }): OrderState => {
    const order = {
        ...payload.orderData,
        id: payload.orderId
    };
    const updatedOrders = [...state.orders, order];
    return updateObject(state, {
        orders: updatedOrders,
        loading: false,
        purchased: true
    });
}

const purchaseBurgerStartHelper = (state: OrderState): OrderState => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerInitHelper = (state: OrderState): OrderState => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerFailedHelper = (state: OrderState): OrderState => {
    return updateObject(state, {
        loading: false,
        purchased: false
    });
}
export default ordersReducer;
