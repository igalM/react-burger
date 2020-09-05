import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    id: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStartHelper(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccessHelper(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailedHelper(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogoutHelper(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

const authStartHelper = (state, action) => {
    return updateObject(state, { loading: true });
}

const authSuccessHelper = (state, action) => {
    return updateObject(state, {
        token: action.token,
        id: action.id,
        error: null,
        loading: false
    });
}

const authFailedHelper = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogoutHelper = (state, action) => {
    return updateObject(state, { token: null, id: null });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}

export default authReducer;
