import React, { useEffect, useState, useCallback } from 'react';
import styles from './Auth.module.scss';
import * as actionsCreators from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';
import {
    selectAuthLoadingState,
    selectAuthErrorState,
    selectIsAuthenticatedState,
    selectIsBuildingBurgerState,
    selectAuthRedirectPathState
} from '../../store/reducers/selectors';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

const Auth: React.FC = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [loadingAuthMode, setLoadingAuthMode] = useState(false);

    const loading = useSelector(selectAuthLoadingState);
    const error = useSelector(selectAuthErrorState);
    const isAuthenticated = useSelector(selectIsAuthenticatedState);
    const authRedirectPath = useSelector(selectAuthRedirectPathState);
    const isBuildingBurger = useSelector(selectIsBuildingBurgerState);

    const dispatch = useDispatch();
    const onSetAuthRedirectPath = useCallback(() => dispatch(actionsCreators.setAuthRedirectPath('/')), [dispatch]);

    useEffect(() => {
        if (!isBuildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, isBuildingBurger, authRedirectPath]);

    const changeAuthModeHandler = () => {
        setLoadingAuthMode(true);
        setTimeout(() => {
            setIsSignup(!isSignup);
            setLoadingAuthMode(false);
        }, 200);
    };


    let authRedirect = null;

    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    return (
        <div className={styles.Auth}>
            <h2>{isSignup ? 'Sign Up'
                : 'Log In'}</h2>
            {authRedirect}
            {error ? error : null}
            {loading || loadingAuthMode ? <Spinner />
                : <AuthForm changedMode={changeAuthModeHandler} isSignup={isSignup} />}
        </div>
    )
}

export default Auth;
