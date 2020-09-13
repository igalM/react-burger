import { put, takeEvery, delay, call } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { checkAuthTimeout, auth } from '../actions/index';

type FirebaseResponse = {
    data: {
        idToken: string,
        expiresIn: number,
        localId: string
    }
}


function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expiredDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.authLogoutSucceed());
}

function* checkAuthTimeoutSaga(action: ReturnType<typeof checkAuthTimeout>) {
    yield delay(action.payload * 1000);
    yield put(actions.authLogout())
}

function* authUserSaga(action: ReturnType<typeof auth>) {
    yield put(actions.authStart());
    const authData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true
    }
    let url = process.env.REACT_APP_GOOGLE_SIGN_UP as string;
    if (!action.payload.isSignup) {
        url = process.env.REACT_APP_GOOGLE_SIGN_IN as string;
    }
    try {
        const res: FirebaseResponse = yield call(() => axios.post(url, authData));
        const expiredDate = new Date(new Date().getTime() + res.data.expiresIn * 1000).toString();
        yield call([localStorage, 'setItem'], 'token', res.data.idToken);
        yield call([localStorage, 'setItem'], 'expiredDate', expiredDate);
        yield call([localStorage, 'setItem'], 'userId', res.data.localId);
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    } catch (err) {
        yield put(actions.authFailed(err.response.data.error.message));
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
