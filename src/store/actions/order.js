import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
});

export const purchaseBurgerFailed = error => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (order, token) => ({
    type: actionTypes.PURCHASE_BURGER,
    order,
    token
})

export const initPurchase = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFailed = error => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => ({
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
});
