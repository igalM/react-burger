import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";
import { AuthActions } from '../actions/auth';

interface AuthState {
    token: string | null,
    userId: string | null,
    error: string | null,
    loading: boolean,
    authRedirectPath: string
}

const initialState: AuthState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStartHelper(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccessHelper(state, action.payload);
        case actionTypes.AUTH_FAILED:
            return authFailedHelper(state, action.payload);
        case actionTypes.AUTH_LOGOUT:
            return authLogoutHelper(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action.payload);
        default:
            return state;
    }
}

const authStartHelper = (state: AuthState): AuthState => {
    return updateObject(state, { loading: true });
}

const authSuccessHelper = (state: AuthState, payload: { token: string, userId: string }): AuthState => {
    return updateObject(state, {
        token: payload.token,
        userId: payload.userId,
        error: null,
        loading: false
    });
}

const authFailedHelper = (state: AuthState, payload: string): AuthState => {
    return updateObject(state, {
        error: payload,
        loading: false
    })
}

const authLogoutHelper = (state: AuthState): AuthState => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state: AuthState, payload: string): AuthState => {
    return updateObject(state, { authRedirectPath: payload });
}

export default authReducer;
