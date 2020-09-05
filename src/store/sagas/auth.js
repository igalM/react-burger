import { put, takeEvery, delay, call } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from '../../axios-orders';


function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expiredDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.authLogoutSucceed());
}

function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiredTime * 1000);
    yield put(actions.authLogout())
}

function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = process.env.REACT_APP_GOOGLE_SIGN_UP;
    if (!action.isSignup) {
        url = process.env.REACT_APP_GOOGLE_SIGN_IN;
    }
    try {
        const res = yield call(() => axios.post(url, authData));
        const expiredDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield call([localStorage, 'setItem'], 'token', res.data.idToken);
        yield call([localStorage, 'setItem'], 'expiredDate', expiredDate);
        yield call([localStorage, 'setItem'], 'userId', res.data.localId);
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    } catch (err) {
        yield put(actions.authFailed(err.response.data.error));
    }
}

function* authCheckStateSaga() {
    const token = yield call([localStorage, 'getItem'], 'token');
    let expiredDate = yield call([localStorage, 'getItem'], 'expiredDate');
    const userId = yield call([localStorage, 'getItem'], 'userId');
    if (expiredDate) {
        expiredDate = new Date(expiredDate);
        if (expiredDate <= new Date()) {
            yield put(actions.authLogout());
        } else {
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expiredDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}

export default [
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
]
