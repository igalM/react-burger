import * as actionTypes from './actionTypes';

export const authSuccess = (token, id) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    id
});

export const authFailed = error => ({
    type: actionTypes.AUTH_FAILED,
    error
});

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authLogout = () => ({
    type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const authLogoutSucceed = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expiredTime => ({
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    expiredTime
});

export const auth = (email, password, isSignup) => ({
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
});

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
});

export const checkAuthState = () => ({
    type: actionTypes.AUTH_CHECK_STATE
});
