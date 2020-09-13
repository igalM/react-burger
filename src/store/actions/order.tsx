import * as actionTypes from "./actionTypes";
import { typedAction } from '../../shared/utility';
import { Order } from "../../types";

export const purchaseBurgerSuccess = (orderId: string, orderData: Order) => {
    return typedAction(actionTypes.PURCHASE_BURGER_SUCCESS, { orderId, orderData });
};

export const purchaseBurgerFailed = (error: string) => {
    return typedAction(actionTypes.PURCHASE_BURGER_FAILED, error);
};

export const purchaseBurgerStart = () => {
    return typedAction(actionTypes.PURCHASE_BURGER_START);
};

export const purchaseBurger = (order: Order, token: string) => {
    return typedAction(actionTypes.PURCHASE_BURGER, { order, token });
};

export const initPurchase = () => {
    return typedAction(actionTypes.PURCHASE_INIT);
};

export const fetchOrdersSuccess = (orders: Order[]) => {
    return typedAction(actionTypes.FETCH_ORDERS_SUCCESS, orders);
};

export const fetchOrdersFailed = (error: string) => {
    return typedAction(actionTypes.FETCH_ORDERS_FAILED, error);
};

export const fetchOrdersStart = () => {
    return typedAction(actionTypes.FETCH_ORDERS_START);
};

export const fetchOrders = (token: string, userId: string) => {
    return typedAction(actionTypes.FETCH_ORDERS, { token, userId });
};

export type OrderActions =
    ReturnType<
        typeof fetchOrders |
        typeof fetchOrdersStart |
        typeof fetchOrdersFailed |
        typeof fetchOrdersSuccess |
        typeof initPurchase |
        typeof purchaseBurger |
        typeof purchaseBurgerStart |
        typeof purchaseBurgerFailed |
        typeof purchaseBurgerSuccess>;

