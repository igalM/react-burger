import axios from '../../axios-orders';
import { put, takeEvery, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

function* initIngredientsSaga() {
    try {
        const res = yield call(() => axios.get('ingredients.json'));
        yield put(actions.fetchIngredientsSuccess(res.data))
    } catch (err) {
        yield put(actions.fetchIngredientsFailed())
    }
}

export default [
    takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
];
