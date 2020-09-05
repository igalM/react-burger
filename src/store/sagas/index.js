import BurgerBuilderSagas from './burgerBuilder';
import AuthSagas from './auth';
import OrderSagas from './order';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...BurgerBuilderSagas,
        ...AuthSagas,
        ...OrderSagas
    ])
}