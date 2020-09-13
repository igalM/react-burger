import * as actionTypes from './actionTypes';
import { typedAction } from '../../shared/utility';
import { User } from '../../types';

export const authSuccess = (token: string, userId: string) => {
    return typedAction(actionTypes.AUTH_SUCCESS, { token, userId });
};

export const authFailed = (error: string) => {
    return typedAction(actionTypes.AUTH_FAILED, error);
};

export const authStart = () => {
    return typedAction(actionTypes.AUTH_START);
};

export const authLogout = () => {
    return typedAction(actionTypes.AUTH_INITIATE_LOGOUT);
};

export const authLogoutSucceed = () => {
    return typedAction(actionTypes.AUTH_LOGOUT);
};

export const checkAuthTimeout = (expiredTime: number) => {
    return typedAction(actionTypes.CHECK_AUTH_TIMEOUT, expiredTime);
};

export const auth = (user: User) => {
    return typedAction(actionTypes.AUTH_USER, user);
};

export const setAuthRedirectPath = (path: string) => {
    return typedAction(actionTypes.SET_AUTH_REDIRECT_PATH, path);
};

export const checkAuthState = () => {
    return typedAction(actionTypes.AUTH_CHECK_STATE);
};

export type AuthActions =
    ReturnType<
        typeof checkAuthState |
        typeof setAuthRedirectPath |
        typeof auth |
        typeof checkAuthTimeout |
        typeof authLogoutSucceed |
        typeof authLogout |
        typeof authStart |
        typeof authFailed |
        typeof authSuccess>;