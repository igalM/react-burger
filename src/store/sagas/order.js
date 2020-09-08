import axios from "../../axios-orders";
import { put, takeEvery, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const res = yield call(() => axios.post(`orders.json?auth=${action.token}`, action.order));
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.order));
        yield put(actions.fetchIngredients());
    } catch (err) {
        yield put(actions.purchaseBurgerFailed(err));
    }
}

function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
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