import React, { useEffect, useState, useCallback } from 'react';
import styles from './Auth.module.scss';
import * as actionsCreators from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/UI/Input/Input';
import { CustomButton } from '../../components/UI/Button/Button';

const Auth = props => {
    const [isSignup, setIsSignup] = useState(true);
    const [loadingAuthMode, setLoadingAuthMode] = useState(false);
    const values = { email: '', password: '' };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be a valid email')
            .required('Required'),
    });

    const dispatch = useDispatch();

    const onSubmitAuth = (email, password, isSignup) => dispatch(actionsCreators.auth(email, password, isSignup));
    const onSetAuthRedirectPath = useCallback(() => dispatch(actionsCreators.setAuthRedirectPath('/')), [dispatch]);

    const loading = useSelector(state => state.authReducer.loading);
    const error = useSelector(state => state.authReducer.error);
    const isAuthenticated = useSelector(state => state.authReducer.token !== null);
    const authRedirectPath = useSelector(state => state.authReducer.authRedirectPath);
    const isBuildingBurger = useSelector(state => state.ingredientsReducer.isBuildingBurger);


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

    let form = <div>
        <Formik
            onSubmit={(values) => {
                onSubmitAuth(values.email, values.password, isSignup);
            }}
            initialValues={values}
            validationSchema={validationSchema}>
            <Form>
                <InputField formikKey="email" label="Your Email" />
                <InputField formikKey="password" label="Your Password" type="password" />
                <CustomButton
                    type="submit"
                    className="success">
                    SUBMIT
                </CustomButton>
                {isSignup ? <h5>Already registered? Click <u onClick={changeAuthModeHandler}>Here</u></h5>
                    : <h5>Don't have an account? Click <u onClick={changeAuthModeHandler}>Here</u> to Sign Up</h5>}
            </Form>
        </Formik>
    </div>

    if (loading || loadingAuthMode) {
        form = <Spinner />;
    }

    let authRedirect = null;

    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    let errorMsg = null;

    if (error) {
        errorMsg = <p>{error.message}</p>;
    }

    return (
        <div className={styles.Auth}>
            <h2>{isSignup ? 'Sign Up'
                : 'Log In'}</h2>
            {authRedirect}
            {errorMsg}
            {form}
        </div>
    )
}

export default Auth;
