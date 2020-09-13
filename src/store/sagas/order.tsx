import axios from "../../axios-orders";
import { put, takeEvery, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { fetchOrders, purchaseBurger } from "../actions/index";

function* purchaseBurgerSaga(action: ReturnType<typeof purchaseBurger>) {
    yield put(actions.purchaseBurgerStart());
    try {
        const res = yield call(() => axios.post(`orders.json?auth=${action.payload.token}`, action.payload.order));
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.payload.order));
        yield put(actions.fetchIngredients());
    } catch (err) {
        yield put(actions.purchaseBurgerFailed(err));
    }
}

function* fetchOrdersSaga(action: ReturnType<typeof fetchOrders>) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`;
    try {
        const res = yield call(() => axios.get(`orders.json?${queryParams}`));
        yield put(actions.fetchOrdersSuccess(res.data));
    } catch (err) {
        yield put(actions.fetchOrdersFailed(err));
    }
}

export default [
    takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
];